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
        if (this.jobdetail==null||angular.equals({}, this.jobdetail)){
            console.log('123');
        }
        this.subscription = this.jobdetailService
                                .getJobDetail()
                                .subscribe(
                                    job => {
                                        this.jobdetail = job.info;
                                        if (this.jobdetail.jobId){
                                            console.log('asdf');
                                        }
                                    });
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
