import { Component, OnInit } from '@angular/core';
import { userProfile } from '../Models/userProfile';

import { Router } from '@angular/router';

@Component ({
    selector: 'navbar',
    templateUrl: './app/navbar/navbar.component.html'
})

export class NavbarComponent{
    currentUser: userProfile;
    constructor(private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    logout(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
    }
}