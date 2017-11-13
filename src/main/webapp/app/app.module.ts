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
import { UserComponent } from './user/user.component';
import { JobdetailComponent } from "./jobdetail/jobdetail.component";
import { PostjobComponent } from "./postjob/postjob.component";

import { LoginService } from './login/login.service';
import { SignupService} from './signup/signup.service';
import { AlertService } from './alert/alert.service';
import { UserService } from './user/user.service';
import { NavbarService } from './navbar/navbar.service';
import { JobinfoService} from './jobinfo/jobinfo.service';
import { JobdetailService } from "./jobdetail/jobdetail.service";
import { JoblistsService} from "./jobinfo/joblists/joblists.service";
import { PostjobService } from "./postjob/postjob.service";


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'jobInfo', component: JobinfoComponent},
  {path: 'userprofile', component: UserComponent},
  {path: '', component: WelcomeComponent},
  {path: "jobdetail", component: JobdetailComponent},
  {path: "postjob", component: PostjobComponent},
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
    JobdetailComponent,
    AlertComponent,
    UserComponent,
    PostjobComponent,
    ],

  providers: [
    LoginService,
    SignupService,
    AlertService,
    JobinfoService,
    JobdetailService,
    JoblistsService,
    UserService,
    NavbarService,
    JoblistsService,
    PostjobService,
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }