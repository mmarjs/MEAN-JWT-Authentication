import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model: any = {
        username: '',
        password: ''
    };
    loading = false;
    error = '';

    constructor(
            private router: Router,
            private authService: AuthService) { }

    ngOnInit() {
        if (localStorage.getItem('token')) {
            this.authService.logout();
        }
    }

  login() {
      this.loading = true;
      this.authService.login(this.model.username, this.model.password)
          .subscribe(result => {
              console.log(result);
              if (result) {
                  // login successful
                  this.router.navigate(['/register']);
              } else {
                  // login failed
                  this.error = 'Username or password is incorrect';
                  this.loading = false;
              }
          });
  }

}
