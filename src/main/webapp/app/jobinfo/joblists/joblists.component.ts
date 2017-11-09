import {Component, Injectable, Input,  } from '@angular/core';
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
    public jobdetail: jobDetails;
    @Input() jobModels: jobDetails[];
    constructor (
        private router: Router,
        private jobinfoService: JobinfoService
    ) {
        if(localStorage.getItem("jobdetail") !== null) {
            this.jobdetail = JSON.parse(localStorage.getItem("jobdetail"));
        }
    }


    goToJobDetail (job) {
        this.jobdetail = job;
        localStorage.setItem("jobdetail", JSON.stringify(job));
        //this.router.navigate(['/jobDetail']);

    }

}
