import { Injectable }    from '@angular/core';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';

import {jobDetails} from "../Models/jobDetails";

@Injectable()
export class PostjobService {
    private headers = new Headers();
    private postjobUrl = '/newJob';
    public thisjob: jobDetails;

    constructor (
        private http: Http,
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