import { Injectable }    from '@angular/core';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';

import {jobDetails} from "../Models/jobDetails";
import { DatePipe } from '@angular/common';


@Injectable()
export class PostjobService {
    private headers = new Headers();
    private postjobUrl = '/newJob';
    private updjobUrl = '/updateJobInfo';
    public thisjob: jobDetails;

    constructor (
        private http: Http,
        private datePipe: DatePipe
    ) { }

    create (form: jobDetails){
        let body = JSON.stringify({
            // jobId: form.jobId,
            jobTittle: form.jobTittle,
            jobDescription: form.jobDescription,
            company: form.company,
            requiredSkills: form.requiredSkills,
            // createdTime: form.createdTime,
            startTime: form.startTime,
            expirTime: form.expirTime,
            location: form.location,
            categories: form.categories,
            // comments: form.comments,
        });

        return this.http
            .post(this.postjobUrl, body, {headers: this.headers})
            .map(this.handleData.bind(this));
    }

    update(form: jobDetails) {
        let start, expire;
        if (typeof form.startTime == 'number') {
            start = this.datePipe.transform(form.startTime, "yyyy-MM-dd");
        } else {
            start = form.startTime;
        }
        if (typeof form.expirTime == 'number') {
            expire = this.datePipe.transform(form.expirTime, "yyyy-MM-dd");
        } else {
            expire = form.expirTime;
        }
        console.log(start, expire);
        let body = JSON.stringify({
            jobId: form.jobId,
            jobTittle: form.jobTittle,
            jobDescription: form.jobDescription,
            company: form.company,
            requiredSkills: form.requiredSkills,
            // createdTime: form.createdTime,
            startTime: start,
            expirTime: expire,
            location: form.location,
            categories: form.categories,
            comments: form.comments,
        });

        return this.http
            .post(this.updjobUrl, body, {headers: this.headers})
            .map(this.handleData.bind(this));
    }

    private handleData(response: Response) {
        let body = response.json();
        if (body) {
            if (localStorage.getItem('jobId') != null) {
                localStorage.removeItem('jobId');
            }
            this.thisjob = JSON.parse(JSON.stringify(body));
            localStorage.setItem('jobId', this.thisjob.jobId);
            return body;
        }
        return body || { };
    }
}