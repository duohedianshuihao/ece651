import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobdetailService } from "./jobdetail.service";
import { jobDetails } from '../Models/jobDetails';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: "jobdetail",
    templateUrl: "jobdetail.component.html",
    styleUrls: ['jobdetail.component.css']
})

export class JobdetailComponent implements OnDestroy{
    private subscription = new Subscription();
    public jobdetail: jobDetails;

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
            }, error => {
                console.log(error);
            });
    }

    ngOnDestroy() {
        // this.subscription.unsubscribe();
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
