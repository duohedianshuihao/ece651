import {Component, Injectable, Input, Output, EventEmitter, } from '@angular/core';
import { JobinfoService } from '../jobinfo.service';
import { jobDetails } from '../../Models/jobDetails';
import {Router} from "@angular/router";
import { JoblistsService} from "./joblists.service";

@Component({
    moduleId: module.id,
    selector: 'joblists',
    templateUrl: 'joblists.component.html',
    styleUrls: ['joblists.component.css']

})

@Injectable()
export class JoblistsComponent {
    public jobdetail: jobDetails;
    @Input() jobModels: jobDetails[];
    constructor (
        private router: Router,
        private jobinfoService: JobinfoService,
        private joblistService: JoblistsService
    ) {
        // if(localStorage.getItem("jobdetail") !== null) {
        //     this.jobdetail = JSON.parse(localStorage.getItem("jobdetail"));
        // }
    }

    goToJobDetail (job) {
        // console.log(job.jobTittle);
        // this.jobdetail = job;
        // this.jobinfoService.emitJobdetail(job.jobTittle);
        // localStorage.setItem("jobdetail", JSON.stringify(job));
        this.joblistService.jobdata = job;
        this.router.navigate(['/jobdetail']);

    }


}
