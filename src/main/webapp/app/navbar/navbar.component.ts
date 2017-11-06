import { Component, OnInit } from '@angular/core';
import { userProfile } from '../Models/userProfile';
import { LoginService } from '../login/login.service';
import { NavbarService } from './navbar.service';


import { Router } from '@angular/router';

@Component ({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit{
    currentUser: userProfile;
    searchWord: string;
    constructor(private router: Router,
                private loginService: LoginService,
                private navbarService: NavbarService
                )
    {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.searchWord = "";
    }

    logout() {
        // localStorage.removeItem('currentUser');
        this.loginService.logout();
        // following function would not work if nothing changed
        // this.router.navigate(['jobList']);
        location.reload();
    }

    search() {
        // if (this.searchWord) {
        //     this.navbarService.searchJob(this.searchWord)
        //                       .subscribe()
        // }
    }

    redirect() {
        this.router.navigate(['/userprofile']);
    }

}