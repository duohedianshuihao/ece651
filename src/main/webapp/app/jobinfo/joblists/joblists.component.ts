import {Component, Injectable, Input, } from '@angular/core';
import { JobinfoService } from '../jobinfo.service';
import { jobDetails } from '../../Models/jobDetails';
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'joblists',
    templateUrl: 'joblists.component.html',
    styleUrls: ['joblists.component.css']

})

@Injectable()
export class JoblistsComponent {
    public jobId: string;
    public jobTitle: string;
    public jobDescription: string;
    public company: string;
    public requiredSkills: Array<string>;
    public createdTime: Date;
    public startTime: Date;
    public expirTime: Date;
    public location: string;
    public categories: string;
    public comments: Comment;
    public jobdetail: jobDetails;
    @Input() jobModels: jobDetails[];
    constructor (
        private router: Router,
        private jobinfoService: JobinfoService
    ) {}

    goToJobDetail (job) {
        console.log(job.jobTittle);
        this.jobdetail = job;

        this.router.navigate(['/jobDetail']);

    }

}
