import { Component, OnInit } from '@angular/core';
import { JobinfoService } from './jobinfo.service';

import { JobDetails } from '../Models/jobDetails';

@Component({
    moduleId: module.id,
    selector: 'jobinfo',
    templateUrl: 'jobinfo.component.html',
    styleUrls: ['jobinfo.component.css']
})

export class JobinfoComponent implements OnInit{
    public jobModels: JobDetails[] = [];

    constructor (
        private jobinfoService: JobinfoService
        ) {}

    ngOnInit () {

        // console.log(this.jobModels);
        this.jobinfoService.getJobDetails().subscribe(jobModels => {
            this.jobModels = jobModels;
        });

    }

}
