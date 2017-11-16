import { Component } from "@angular/core";
import { userProfile } from "../Models/userProfile";
import { JobdetailService } from "../jobdetail/jobdetail.service";
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from "../alert/alert.service";

@Component({
    moduleId: module.id,
    selector: "userview",
    templateUrl: "userview.component.html",
    styleUrls: ['userview.component.css']
})

export class UserviewComponent {
    private subscription = new Subscription();
    public user: userProfile;
    public email: string;
    public trueuser: userProfile;
    constructor(
        private jobdetailService: JobdetailService,
        private alertService: AlertService,

    ){
        this.subscription = this.jobdetailService
                                .getUserview()
                                .subscribe(
                                    user => {
                                        this.user = user.info;
                                        console.log(user);
                                        if (!this.user.skills){
                                            this.user.skills = [];
                                        }
                                        // console.log(user.info.email);
                                        // this.email = user.info.email;
                                    });

    }

}