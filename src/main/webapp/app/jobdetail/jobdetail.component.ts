import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobdetailService } from "./jobdetail.service";
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
        private jobdetailService: JobdetailService
        )
    {
        this.subscription = this.jobdetailService
                                .getJobDetail()
                                .subscribe(
                                    job => {
                                        this.jobdetail = job.info;
                                    });
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
