import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { signupForm } from "../Models/signupForm";
import { SignupService } from './signup.service';
import { AlertService } from '../alert/alert.service';

@Component({
    moduleId: module.id,
    selector: 'signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.css']
})

export class SignupComponent implements OnInit{
  private signupform: signupForm;
  public submitted = false;
  constructor(
    private signupService: SignupService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(){
    this.signupform = new signupForm("", "", "", "", "");
  }

  add(form: signupForm){
    console.log(form.userType);
    this.signupService
        .create(form)
        .subscribe(
          data => {
            this.router.navigate(['/login']);
            this.alertService.success('Registration successful', true);
          },
          error => {
            this.alertService.error(error.text());
          });
  }
}

