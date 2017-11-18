import {Component, OnDestroy, OnInit} from "@angular/core";
import {jobDetails } from "../Models/jobDetails";
import {Router} from "@angular/router";
import {AlertService} from "../alert/alert.service";
import {PostjobService} from "../postjob/postjob.service";
import { JobdetailService} from "../jobdetail/jobdetail.service";
import {Subscription} from "rxjs/Subscription";


@Component({
    moduleId: module.id,
    selector: "editjob",
    templateUrl: "editjob.component.html",
    styleUrls: ['editjob.component.css']
})

export class EditjobComponent implements OnDestroy, OnInit{
    private jobform: jobDetails;
    public skill: string;
    public submitted: false;
    private subscription = new Subscription();

    constructor(
        private postjobService: PostjobService,
        private alertService: AlertService,
        private router: Router,
        private jobdetailService: JobdetailService,
    ) {

        // this.subscription = this.jobdetailService
        //     .getJobDetail()
        //     .subscribe(
        //         job => {
        //             console.log(job);
        //             this.jobform = job.info;
        //         });
    }

    ngOnInit() {
        this.jobform = this.jobdetailService.jobform;
    }
    ngOnDestroy() {
         this.subscription.unsubscribe();
        // let company = null;
        // this.jobform = new jobDetails("","","",company,new Array<string>(),new Date(),new Date(),new Date(),"", "", new Array<any>());
    }

    add(form:jobDetails) {
        // form.company = JSON.parse(localStorage.getItem("currentUser"));
        this.postjobService
            .update(form)
            .subscribe(
                data => {
                    this.router.navigate(['/jobdetail'])
                    this.alertService.success('Post Job successful', true);
                },
                error => {
                    console.log('there ' + error);
                    // this.alertService.error(error.text());
                });
    }

    add_skills(skill) {
        if (!this.jobform.requiredSkills.includes(skill)) {
            this.jobform.requiredSkills.push(skill);
        }
        this.skill = "";
    }

    remove_skills(skill) {
        this.jobform.requiredSkills = this.jobform.requiredSkills.filter(obj => obj !== skill);
        console.log(this.jobform.requiredSkills);
    }
}