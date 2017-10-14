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

  form = new signupForm("", "", "");
  get diagnostic() { return JSON.stringify(this.form); }

  add(email:string, username:string, password:string): void{
    this.signupService
        .create(email, username, password)
  }
}

