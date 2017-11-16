import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobdetailService } from "./jobdetail.service";
import { jobDetails } from '../Models/jobDetails';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { Subscription } from 'rxjs/Subscription';
import { userProfile } from "../Models/userProfile";

@Component({
    moduleId: module.id,
    selector: "jobdetail",
    templateUrl: "jobdetail.component.html",
    styleUrls: ['jobdetail.component.css']
})

export class JobdetailComponent implements OnDestroy{
    private subscription = new Subscription();
    public jobdetail: jobDetails;
    public viewuser:userProfile;

    constructor(
        private alertService: AlertService,
        private router: Router,
        private jobdetailService: JobdetailService
        )
    {
        // this.subscription = this.jobdetailService
        //                         .getJobDetail()
        //                         .subscribe(
        //                             job => {
        //                                 this.jobdetail = job.info;
        //                             });

        this.jobdetailService
            .getJobDetails(localStorage.getItem('jobId'))
            .subscribe(jobDetail => {
                this.jobdetail = jobDetail;
                console.log(this.jobdetail);
            }, error => {
                console.log(error);
            });

    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
    }

    gotoUserview() {
        this.router.navigate(['userview']);
        this.jobdetailService
            .getUserEmail(this.jobdetail.company.email)
            .subscribe(
                data => {
                    this.viewuser = data;
                    this.setTime();
                }, error => {
                    this.alertService.error(error.text());
                });
    }

    setTime() {
        setTimeout(() =>
            {
                // console.log(this.viewuser);
                this.jobdetailService
                    .userView(this.viewuser);
            },
            5);
    }

    gotoCommentuser(username) {

        this.router.navigate(['userview']);
        setTimeout(() =>
            {
                this.jobdetailService
                    .userView(username);
            },
            5);
    }

    addComment(comment) {

        this.jobdetailService.addComment(comment, this.jobdetail.jobId)
            .subscribe(
                info => {
                    window.location.reload();
                    this.alertService.success("Comment Added", true);
                },
                error => {
                    this.alertService.error(error.text());
                });
    }
}
