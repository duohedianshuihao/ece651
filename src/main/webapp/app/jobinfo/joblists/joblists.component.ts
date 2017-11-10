import { Component, Injectable, Input } from '@angular/core';
import { JobdetailService } from '../../jobdetail/jobdetail.service';
import { jobDetails } from '../../Models/jobDetails';
import { Router, RouterLink } from "@angular/router";

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
        private jobdetailService: JobdetailService
    ) {
    }

    goToJobDetail (job:jobDetails) {
        this.router.navigate(['jobdetail']);
        setTimeout(() =>
        {
            this.jobdetailService
                .jobDetail(job);
        },
        5);
    }

}
