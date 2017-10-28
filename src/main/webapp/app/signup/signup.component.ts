import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { signupForm } from "../Models/signupForm";

import { SignupService } from './signup.service';

@Component({
    selector: 'signup',
    templateUrl: './app/signup/signup.component.html'
})

export class SignupComponent implements OnInit{
  private signupform: signupForm;
  constructor(
    private signupService: SignupService,
    private router: Router
  ) { }

  ngOnInit(){
    this.signupform = new signupForm("", "", "", "");
  }

  add(form: signupForm){
    this.signupService
        .create(form)
        .subscribe(
          data => {
            this.router.navigate(['/login']);
          },
          error => {
            console.log(error);
          });
  }

  clear():void{
    this.signupform.email = '';
    this.signupform.username = '';
    this.signupform.password = '';
    this.signupform.password_again = '';
  }


}

