import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';
import { AlertService } from '../alert/alert.service';
import { userProfile } from '../Models/userProfile';
import { password } from '../Models/password';

@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: "user.component.html",
    styleUrls: ["user.component.css"]
})

export class UserComponent implements OnInit {
    currentUser: any;
    user: any;
    _password: password;

    public submitted: false;
    public passwordSubmitted: false;
    public dataLoaded: boolean;
    public email_updated: boolean;
    public email_changed: boolean;
    public userName_updated: boolean;
    public userName_changed: boolean;
    public skills_changed: boolean;
    public skills_updated: boolean;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.dataLoaded = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this._password = new password("", "", "");
    }

    ngOnInit(){
        this.submitted = false;

        this.email_updated = false;
        this.userName_updated = false;
        this.skills_updated = false;
        this.email_changed = false;
        this.userName_changed = false;
        this.skills_changed = false;
        this.userService.getUser(this.currentUser.userName)
                        .subscribe(
                            data => {
                                this.user = data;
                                this.dataLoaded = true;
                            });
    }

    check_update(){
        console.log(this.user.userName);
        console.log(this.currentUser.userName);
        if (this.currentUser.userName != this.user.userName){
            this.userName_changed = true;
        }
        if (this.currentUser.skills != this.user.skills) {
            this.skills_changed = true;
        }
        if (this.currentUser.email != this.user.email) {
            this.email_changed = true;
        }

        if (!this.userName_changed && !this.email_changed ) {
            this.alertService.error("Nothing to be updated", true);
        }
    }

    updateInfo(user) {
        if (this.email_changed) {
            this.userService
            .updateEmail(user, this.currentUser)
            .subscribe(
                info => {
                    this.email_updated = true;
                },
                error => {
                    this.alertService.error(error.text());
                });
        }

        if (this.userName_changed) {
            this.userService
            .updateUserName(user, this.currentUser)
            .subscribe(
                info => {
                    this.userName_updated = true;
                },
                error => {
                    this.alertService.error(error.text());
                });
        }

        if (this.skills_changed) {
            this.userService
            .updateSkills(user, this.currentUser)
            .subscribe(
                info => {
                    this.skills_updated = true;
                },
                error => {
                    this.alertService.error(error.text());
                });
        }
    }

    show_info() {
        if (this.email_updated || this.userName_updated) {
            this.alertService.success("Information Updated", true);
        }
    }

    check_password() {
        this.userService.check_password(this._password, this.currentUser)
                        .subscribe(
                            info => {
                                this.update_password();
                            },
                            error => {
                                this.alertService.error(error.text());
                            });
    }

    update_password() {
        this.userService.updatePassword(this._password, this.currentUser)
                        .subscribe(
                            info => {
                                this.alertService.success("Password Updated", true);
                            },
                            error => {
                                this.alertService.error(error.text());
                            });
    }

}

