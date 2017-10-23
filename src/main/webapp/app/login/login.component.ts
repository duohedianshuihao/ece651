import { Component, OnInit } from '@angular/core';
import { loginForm } from "../Models/loginForm";
import { LoginService } from "./login.service";


@Component({
  selector: 'login',
  templateUrl: './app/login/login.component.html'
})

export class LoginComponent {
  constructor(
    private loginService : LoginService
  ) { }

  form = new loginForm("", "");

  get(form: loginForm) {
    this.loginService
        .login(form)
        .subscribe();
  }

  clear() {
    this.form.info = "";
    this.form.password = "";
  }


}
