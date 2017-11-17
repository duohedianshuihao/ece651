import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params} from '@angular/router';

import { UserService } from './user.service';
import { AlertService } from '../alert/alert.service';
import { LoginService } from '../login/login.service';
import { JobdetailService } from '../jobdetail/jobdetail.service';
import { loginForm } from '../Models/loginForm';
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
    public userType_changed: boolean;
    public userType_updated: boolean;

    public skill: string;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private jobDetailService: JobdetailService
    ) {
        this.dataLoaded = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this._password = new password("", "", "");
    }

    ngOnInit(){
        this.submitted = false;
        this.email_updated = false;
        this.email_changed = false;
        this.userName_updated = false;
        this.userName_changed = false;
        this.skills_updated = false;
        this.skills_changed = false;
        this.passwordSubmitted = false;

        this.userService
            .getUser(this.currentUser.userName)
            .subscribe(
                data => {
                    this.user = data;
                    if (!this.user.skills){
                        this.user.skills = [];
                    }
                    this.dataLoaded = true;
                }, error => {
                    this.alertService.error(error.text());
                });
    }

    check_update(user){

        if (this.currentUser.userName != user.userName){
            this.userName_changed = true;
        }
        // if (this.currentUser.skills != this.user.skills) {
        //     this.skills_changed = true;
        // }
        if (this.currentUser.email != user.email) {
            this.email_changed = true;
        }

        if (!this.currentUser.userType) {
            this.userType_changed = true;
        }

        if (!this.userName_changed && !this.email_changed ) {
            this.alertService.error("Nothing to be updated", true);
        }
    }

    check_raceCondition(){
       if (!this.userName_changed && !this.email_changed ) {
            return false;
        }
        if (this.userName_changed && this.email_changed ) {
            this.alertService.error("Please do not update username and email at the same time!!", true);
            this.userName_changed = false;
            this.email_changed = false;
            return false;
        }
        if (this.userName_changed || this.email_changed ) {
            return true;
        }
    }

    updateInfo(user) {
        if (this.check_raceCondition()){   
            if (this.userName_changed)  {
                this.userService
                    .updateUserName(user, this.currentUser)
                    .subscribe(
                        info => {
                            this.update_currentUser(user);
                        }, error => {
                            console.log('there ' + error);
                            this.alertService.error(error.text());
                        });
            }

            if (this.email_changed) {
                this.userService
                    .updateEmail(user, this.currentUser)
                    .subscribe(
                        info => {
                            this.update_basedOnEmail(user);
                        },
                        error => {
                            this.alertService.error(error.text());
                        });
            }
        }
    }

    show_info() {
        if (this.email_updated || this.userName_updated) {
            this.alertService.success("Information Updated", true);
            location.reload();
        }
    }

    update_currentUser(user) {  
       localStorage.removeItem('currentUser');
        this.userService.getUser(user.userName).subscribe(
            data => {
                this.userName_updated = true;
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.show_info();
            }, error => {
                this.alertService.error("Fail to update", true);
            })
        /*
        let _user_passwd = this.currentUser.password;
        this.loginService.logout();
        let form = new loginForm("", "");
        form.info = user.userName;
        form.password = _user_passwd;
        this.loginService.login(form).subscribe(
            data => {
                this.userName_updated = true;
                this.show_info();
            }, error => {
                this.alertService.error("Fail to update", true);
            });
        */
            
    }
    update_basedOnEmail(user){
        localStorage.removeItem('currentUser');
        this.jobDetailService.getUserEmail(user.email).subscribe(
            data => {
                this.email_updated = true;
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.show_info();
            }, error => {
                this.alertService.error("Fail to update", true);
            })
    }

    check_password() {
        this.userService
            .check_password(this._password, this.currentUser)
            .subscribe(
                info => {
                    this.update_password();
                },
                error => {
                    this.alertService.error(error.text());
                });
    }

    update_password() {
        this.userService
            .updatePassword(this._password, this.currentUser)
            .subscribe(
                info => {
                    this.alertService.success("Password Updated", true);
                    this.passwordSubmitted = false;
                    this._password = new password('', '', '');
                },
                error => {
                    this.alertService.error(error.text());
                });
    }

    update_skills() {
        console.log("update_skills");
        this.userService
            .updateSkills(this.user)
            .subscribe(
                info => {
                    this.alertService.success("Skills Updated", true);
                }, error => {
                    this.alertService.error(error.text());
                });
    }

    add_skills(skill) {
        if (!this.user.skills.includes(skill)) {
            this.user.skills.push(skill);
        }
        this.skill = "";
    }

    remove_skills(skill) {
        this.user.skills = this.user.skills.filter(obj => obj !== skill);
        console.log(this.user.skills);
    }

}

