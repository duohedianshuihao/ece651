import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from "./login.service";

import { userProfile } from '../Models/userProfile';
import { loginForm } from "../Models/loginForm";

@Component({
  selector: 'login',
  templateUrl: './app/login/login.component.html',
  styles: ['./app/login/login.component.css'],
})

export class LoginComponent {
  private loginform: loginForm;
  private user: userProfile;
  constructor(
    private loginService : LoginService,
    private router: Router
  ) { }

  ngOnInit(){
    this.loginform = new loginForm("", "");
    this.user = new userProfile("", "");
  }

  get(form: loginForm) {
    this.loginService
        .login(form)
        .subscribe(
          data => {
            this.router.navigate(['/jobinfo']);
          },
          error => {
            console.log(error.json);
          });
  }

  clear() {
    this.loginform.info = "";
    this.loginform.password = "";
  }



}
