import { Injectable }    from '@angular/core';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { comments } from "../Models/comments";

@Injectable()

export class JobdetailService {
    private headers = new Headers();
    private commentUrl = 'http://localhost:8080/jobsAddComment';

    public usercomment:comments;

    constructor (
        private http: Http,
    ) { }

    getJobDetails(jobId) {
        let jobdataUrl = "/jobs/" + jobId;
        return this.http.get(jobdataUrl, {headers: this.headers})
            .map((response: Response) => response.json());
    }

    create(comment: string, jobId: string) {
        let body = JSON.stringify({
            comment: comment,
            jobId: jobId,
        });
        return this.http
            .post(this.commentUrl, body, {headers: this.headers})
            .map(this.handleData.bind(this));
    }

    private handleData(response: Response) {
        let body = response.json();
        if (body) {
            return body;
        }
        return body || { };
    }
}