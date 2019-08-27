
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData ;
  showError;
  constructor(private _auth: AuthService,
              private _router: Router) {
                this.loginUserData = {};
                this.showError = false;
               }

  ngOnInit() {
  }

  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        this.showError = false;
        localStorage.setItem('token', res.access);
        localStorage.setItem('refresh', res.refresh);
        this._router.navigate(['/todos'])
      },
      err => {
        this.showError = true;
        console.log(err);
      }
    ) 
  }

}