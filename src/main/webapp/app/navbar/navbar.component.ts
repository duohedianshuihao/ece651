import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { userProfile } from '../Models/userProfile';
import { jobDetails } from "../Models/jobDetails";

import { LoginService } from '../login/login.service';
import { NavbarService } from './navbar.service';
import { AlertService } from '../alert/alert.service';
import { JobinfoService } from '../jobinfo/jobinfo.service';


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
    @Input() inJobInfo: boolean;
    @Output() jobUpdate:EventEmitter<{}> = new EventEmitter();

    constructor(private router: Router,
                private loginService: LoginService,
                private navbarService: NavbarService,
                private alertService: AlertService,
                private jobinfoService: JobinfoService
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
        // location.reload();
        if (this.router.url == "/") {
            location.reload();
        } else {
            this.router.navigate(['/'])
        }
    }

    searchJob(word){
        this.navbarService
            .search(word)
            .subscribe(
                jobs => {
                    this.jobUpdate.emit(jobs);
                    this.searchWord = "";
                }, error => {
                    this.alertService.error(error);
                });
    }

    postjob() {
        this.router.navigate((['/postjob']));
    }

    redirect() {
        this.router.navigate(['/userprofile']);
    }

}