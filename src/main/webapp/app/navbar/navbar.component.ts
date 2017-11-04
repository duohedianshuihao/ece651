import { Component, OnInit } from '@angular/core';
import { userProfile } from '../Models/userProfile';
import { LoginService } from '../login/login.service';

import { Router } from '@angular/router';

@Component ({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent{
    currentUser: userProfile;
    constructor(private router: Router,
                private loginService: LoginService
                )
    {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    logout() {
        // localStorage.removeItem('currentUser');
        this.loginService.logout();
        // following function would not work if nothing changed
        // this.router.navigate(['jobList']);
        location.reload();
    }

    redirect() {
        this.router.navigate(['/userprofile', this.currentUser.userName]);
    }

}