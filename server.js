const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const passport = require('passport');

const app = express();
const routes = require('./server/routes');
const teacherReg = require('./server/routes/teacherReg');
const rootRouter = express.Router();
const authMiddleware = require('./server/middleware/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'dist')));

passport.use(authMiddleware.localStrategy);
app.use(passport.initialize());

routes(rootRouter);

app.use('/api', rootRouter);
app.use('/api', teacherReg);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})


const port = process.env.PORT || '3000';

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on localhost: ${port}`));


