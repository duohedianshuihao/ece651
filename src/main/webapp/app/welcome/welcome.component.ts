import { Component, Input } from "@angular/core";
import { userProfile } from '../Models/userProfile';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { WelcomeService } from './welcome.service';

@Component({
    moduleId: module.id,
    selector: "welcome",
    templateUrl: "welcome.component.html",
    styleUrls: ["welcome.component.css"]
})

export class WelcomeComponent {

    currentUser: userProfile;
    constructor(private router: Router
    )
    {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    // logout() {
    //     // localStorage.removeItem('currentUser');
    //     this.loginService.logout();
    //     // following function would not work if nothing changed
    //     // this.router.navigate(['jobList']);
    //     location.reload();
    // }
}