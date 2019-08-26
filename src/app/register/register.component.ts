import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {};
  showSuccess;
  showError;

  constructor(private _auth: AuthService,
              private _router: Router) { 
                this.showSuccess = false;
                this.showError = false;
              }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        this.showError = false;
        this.showSuccess = true;
      },
      err => {
        this.showSuccess = false;
        this.showError = true;
        console.log(err);
      }
    )      
  }


}