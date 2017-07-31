import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private ACCESSTOKEN_KEY = 'token';
  private loggedIn: boolean = false;

  private jwtHelper = new JwtHelper();

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router) { }

   isTokenExpired(): Observable<boolean> {
    return Observable.create(observer => {
      const data = <string>localStorage.getItem(this.ACCESSTOKEN_KEY)
        if (data === 'null') {
          observer.next(true)
        } else {
          observer.next(this.jwtHelper.isTokenExpired(data));
        }
    })
  }

  login(username: string, password: string): Observable<any> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json');
    return Observable.create(observer => {
      this.http.post('/api/login', JSON.stringify({'username': username, 'password': password}), {headers: headers})
        .toPromise()
        .then(data => {
          this.authSuccess(data.json().token);
          observer.next(true);
        }).catch(error => observer.error(error));
    })
  }

  authSuccess(token): void {
    this.loggedIn = true;
    localStorage.setItem(this.ACCESSTOKEN_KEY, token)
  }

  isloggedIn(): boolean {
    return this.loggedIn;
  }

  logout() {
    this.authHttp.delete('/api/logout')
      .subscribe(data => {
        if (data) {
          localStorage.removeItem(this.ACCESSTOKEN_KEY);
          this.loggedIn = false;
          this.router.navigate(['']);
        }
      });
  }

}
