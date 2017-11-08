import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from "./login.service";
import { AlertService } from '../alert/alert.service';

import { userProfile } from '../Models/userProfile';
import { loginForm } from "../Models/loginForm";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})

export class LoginComponent {
  returnUrl: string;
  private loginform: loginForm;
  private user: any;

  public submitted = false;

  constructor(
    private loginService : LoginService,
    private alertService: AlertService,
    private router: Router,
    private adrouter: ActivatedRoute

  ) { }

  ngOnInit(){
    this.loginform = new loginForm("", "");
    this.user = [];
    this.returnUrl = this.adrouter.snapshot.queryParams['returnUrl'] || '/';
  }

  get(form: loginForm) {
    this.loginService.logout();
    this.loginService
        .login(form)
        .subscribe(
          data => {
            this.router.navigate(['/jobInfo']);
          },
          error => {
            this.alertService.error(error.text());
          });
  }


}
