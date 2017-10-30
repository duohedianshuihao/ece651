import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JobinfoComponent } from './jobinfo/jobinfo.component';
import { JoblistsComponent } from './jobinfo/joblists/joblists.component';
import { AlertComponent } from './alert/alert.component';

import { LoginService } from './login/login.service';
import { SignupService} from './signup/signup.service';
import { AlertService } from './alert/alert.service';
import { JobinfoService} from './jobinfo/jobinfo.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'jobList', component: JobinfoComponent},
  {path: '', component: WelcomeComponent}
]

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
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
    JobinfoComponent,
    JoblistsComponent,
    AlertComponent
    ],

  providers: [
    LoginService,
    SignupService,
    AlertService,
    JobinfoService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }