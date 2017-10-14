import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { SignupComponent } from './signup/signup.component';
import { SignupService} from './signup/signup.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ],

  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
    ],

  providers: [
    LoginService,
    SignupService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }