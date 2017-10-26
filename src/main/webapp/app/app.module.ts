import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JobinfoComponent } from './jobinfo/jobinfo.component';

import { LoginService } from './login/login.service';
import { SignupService } from './signup/signup.service';
import { JobinfoService } from "./jobinfo/jobinfo.service";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'jobInfo', component: JobinfoComponent},
  {path: '', component: WelcomeComponent}
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    )
    ],

  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    WelcomeComponent,
    NavbarComponent,
    JobinfoComponent
    ],

  providers: [
    LoginService,
    SignupService,
    JobinfoService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }