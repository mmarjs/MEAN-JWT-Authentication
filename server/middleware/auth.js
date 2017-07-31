'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const expressJwt = require('express-jwt');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('password-hash');
const User = require('../models/user');

const AUTH_HEADER_PREFIX = 'Bearer ';

module.exports.generateToken = function (req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, 'server secret', {
    expiresIn: '7d'
  });
  User.addToken(req.user.id, req.token, function(err, user) {
    if(err) {
        throw err;
    }
    next();
  });
};

module.exports.sendAuthToken = function (req, res) {
    res.status(201).send({token: req.token});
};

module.exports.checkAuthToken = expressJwt({secret: 'server secret'});

function extractAuthToken(req) {
  let authHeader = req.get('Authorization');
  if (authHeader) {
    authHeader = authHeader.startsWith(AUTH_HEADER_PREFIX) ? authHeader.substr(AUTH_HEADER_PREFIX.length - 1)
      : authHeader;
    authHeader = authHeader.trim();
  }
  return authHeader;
}

function sendInvalidAuthTokenError(res) {
  res.status(401).send('Invalid access token');
}

module.exports.checkAuthTokenValid = function (req, res, next) {
  if (req.user) {
    let authToken = extractAuthToken(req);
    if (authToken) {
        User.findByUserId(req.user.id, function(err, user) {
            if(err) {
                throw err;
            }
            !user.token.token || authToken !== user.token.token ? sendInvalidAuthTokenError(res) : next()
        });
    } else {
      sendInvalidAuthTokenError(res);
    }
  } else {
    next();
  }
};

module.exports.serialize = function (req, res, next) {    
    req.user = {
        id: req.user.id
    };
    next();
};

module.exports.authenticate = passport.authenticate('local', {session: false});

module.exports.localStrategy = new LocalStrategy({usernameField: 'username', passwordField: 'password'},
  (username, password, done) => {
  User.findByUsername(username, function(err, user) {
      if(err) {
          throw err;
      }
      user && passwordHash.verify(password, user.password) ? done(null, user) : done(null, false);
  });
});

module.exports.logout = function (req, res, next) {
  User.clearUserSession(req.user.id, function(err, user) {
    req.logout();
    res.status(201).send(user.token.token);
  });
};

