import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { JoblistsService } from "../jobinfo/joblists/joblists.service";
import { JobdetailService } from "./jobdetail.service";
import { jobDetails } from '../Models/jobDetails';
import { comments } from "../Models/comments";
import { AlertService} from "../alert/alert.service";

@Component({
    moduleId: module.id,
    selector: 'jobdetail',
    templateUrl: 'jobdetail.component.html',
    styleUrls: ['jobdetail.component.css']

})

export class JobdetailComponent implements OnInit{
    public jobdetail: jobDetails;
    public usercomment: comments;
    subscription: any;
    constructor (
        private joblistService: JoblistsService,
        private jobdetailService: JobdetailService,
        // private alertService: AlertService,
        private router: Router,
    ) {
        // jobinfoService.getjobDetail.subscribe((emitjob:jobDetails)=>{
        //     this.jobdetail = emitjob;
        // })
        console.log(this.joblistService.jobdata.jobId);
        this.jobdetailService
            .getJobDetails(this.joblistService.jobdata.jobId)
            .subscribe(jobDetail => {
                // console.log(jobDetail.jobTittle);
                this.jobdetail = jobDetail;
                console.log(this.jobdetail.jobTittle)
            }, error => {
                console.log(error);
            });
    }

    ngOnInit() {

        // this.jobdetail = this.joblistService.jobdata;
        // console.log(this.jobinfoService.jobdata.jobTittle);
        // this.subscription = this.jobinfoService.getJobdetailEmitter()
        //     .subscribe(item => this.savejobdetail(item));
        // console.log(this.jobdetail.jobTittle);
    }

    // savejobdetail(item:jobDetails) {
    //     this.jobdetail = item;
    //
    // }

    //
    // addComment(inputcomment:string) {
    //     if (inputcomment != "") {
    //         console.log(inputcomment);
    //         // this.usercomment.comment = inputcomment;
    //         // this.usercomment.replier = localStorage.getItem('currentUser');
    //         // this.usercomment.commentTime = new Date();
    //         this.jobdetailService
    //             .create(inputcomment, this.jobdetail.jobId)
    //             .subscribe(
    //                 data => {
    //                     this.router.navigate(['/jobInfo']);
    //                     this.alertService.success('Registration successful', true);
    //                 },
    //                 error => {
    //                     this.alertService.error(error.text());
    //                 });
    //     } else {
    //         console.log("nothing in it!!");
    //     }
    //
    // }

    // goback() {
    //     // localStorage.removeItem("jobdetail");
    //     window.location.reload();
    // }
}