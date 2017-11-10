import { Component, OnInit, OnDestroy } from '@angular/core';
import { JoblistsService } from "../jobinfo/joblists/joblists.service";
import { jobDetails } from '../Models/jobDetails';

import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: "jobdetail",
    templateUrl: "jobdetail.component.html",
    styleUrls: ['jobdetail.component.css']
})

export class JobdetailComponent implements OnDestroy{
    private subscription = new Subscription();
    public jobdetail: jobDetails;

    constructor(
        private joblistsService: JoblistsService
        ) {
        this.subscription = this.joblistsService
                                .getJob()
                                .subscribe(
                                    (job: jobDetails) => {
                                        console.log('here');
                                        this.jobdetail = job;
                                        console.log(job);
                                        console.log(this.jobdetail);
                                    });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
