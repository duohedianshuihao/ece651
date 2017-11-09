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
    public jobdetail: jobDetails;
    @Input() jobModels: jobDetails[];
    constructor (
        private router: Router,
        private jobinfoService: JobinfoService
    ) {}

    goToJobDetail (job) {
        this.jobdetail = job;

        this.router.navigate(['/jobDetail']);

    }

}
