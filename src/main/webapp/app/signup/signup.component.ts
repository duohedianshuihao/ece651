import { Component, OnInit } from '@angular/core';

import { signupForm } from "../Models/signupForm";

import { SignupService } from './signup.service';

@Component({
    selector: 'signup',
    templateUrl: './app/signup/signup.component.html'
})

export class SignupComponent{
  constructor(
    private signupService: SignupService
  ) { }

  form = new signupForm("", "", "", "");

  add(form: signupForm): void{
    this.signupService
        .create(form)
  }

  clear():void{
    this.form.email = '';
    this.form.username = '';
    this.form.password = '';
    this.form.password_again = '';
  }


}

