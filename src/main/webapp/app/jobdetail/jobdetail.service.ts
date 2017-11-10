import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { jobDetails } from "../Models/jobDetails";



@Injectable()

export class JobdetailService {
    constructor(
        ) {}

    private subject = new Subject<any>();

    jobDetail(job: jobDetails) {
        // console.log(job);
        this.subject
            .next({info: job});
    }

    getJobDetail(): Observable<any>{
        return this.subject.asObservable();
    }
}