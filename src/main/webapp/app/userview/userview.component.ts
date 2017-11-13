import { Component } from "@angular/core";
import { userProfile } from "../Models/userProfile";
import { JobdetailService } from "../jobdetail/jobdetail.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: "userview",
    templateUrl: "userview.component.html",
    styleUrls: ['userview.component.css']
})

export class UserviewComponent {
    private subscription = new Subscription();
    public user: userProfile;
    constructor(
        private jobdetailService: JobdetailService
    ){
        this.subscription = this.jobdetailService
                                .getUserview()
                                .subscribe(
                                    user => {
                                        this.user = user.info;

                                    });
    }

}