import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {

  constructor(private http: Http, private authHttp: AuthHttp) { }

  signup(userInfo): Observable<any> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return Observable.create(observer => {
      this.http.post('/api/register', JSON.stringify(userInfo), {headers: headers})
        .toPromise()
        .then(data => {
          observer.next(true);
        }).catch(error => observer.error(error));
    });
  }

  getUsers(): Observable<any> {
    return Observable.create(observer => {
      this.authHttp.get('/api/users')
        .toPromise()
        .then(data => {
          observer.next(data.json());
        }).catch(error => observer.error(error));
    })
  }

}
