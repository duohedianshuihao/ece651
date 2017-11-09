import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobinfoService } from '../jobinfo.service';
import { JobdetailService } from "./jobdetail.service";
import { jobDetails } from '../../Models/jobDetails';
import { comments } from "../../Models/comments";
import { AlertService} from "../../alert/alert.service";

@Component({
    moduleId: module.id,
    selector: 'jobdetail',
    templateUrl: 'jobdetail.component.html',
    styleUrls: ['jobdetail.component.css']

})

export class JobdetailComponent implements OnInit{
    @Input() jobdetail: jobDetails;
    public usercomment: comments;
    constructor (
        private jobinfoService: JobinfoService,
        private jobdetailService: JobdetailService,
        private alertService: AlertService,
        private router: Router,
    ) {}

    ngOnInit() {
        // this.usercomment = new comments("", "", new Date);
    }

    addComment(inputcomment:string) {
        if (inputcomment != "") {
            console.log(inputcomment);
            // this.usercomment.comment = inputcomment;
            // this.usercomment.replier = localStorage.getItem('currentUser');
            // this.usercomment.commentTime = new Date();
            this.jobdetailService
                .create(inputcomment, this.jobdetail.jobId)
                .subscribe(
                    data => {
                        this.router.navigate(['/jobInfo']);
                        this.alertService.success('Registration successful', true);
                    },
                    error => {
                        this.alertService.error(error.text());
                    });
        } else {
            console.log("nothing in it!!");
        }

    }

    goback() {
        localStorage.removeItem("jobdetail");
        window.location.reload();
    }
}