import {Component, OnDestroy, OnInit} from "@angular/core";
import {jobDetails } from "../Models/jobDetails";
import {Router} from "@angular/router";
import {AlertService} from "../alert/alert.service";
import {PostjobService} from "../postjob/postjob.service";
import { JobdetailService} from "../jobdetail/jobdetail.service";


@Component({
    moduleId: module.id,
    selector: "editjob",
    templateUrl: "editjob.component.html",
    styleUrls: ['editjob.component.css']
})

export class EditjobComponent implements OnInit{
    private jobform: jobDetails;
    public skill: string;
    public submitted: false;

    constructor(
        private postjobService: PostjobService,
        private alertService: AlertService,
        private router: Router,
        private jobdetailService: JobdetailService,
    ) {

    }

    ngOnInit() {
        this.jobform = this.jobdetailService.jobform;
        console.log("starttime" + this.jobform.startTime);
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
        let skills = skill.split(',');
        for (let item of skills) {
            if (!this.jobform.requiredSkills.includes(item)) {
                this.jobform.requiredSkills.push(item);
            }
        }
        this.skill = "";
    }

    remove_skills(skill) {
        this.jobform.requiredSkills = this.jobform.requiredSkills.filter(obj => obj !== skill);
        console.log(this.jobform.requiredSkills);
    }
}