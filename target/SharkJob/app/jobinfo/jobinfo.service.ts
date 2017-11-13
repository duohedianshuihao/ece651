import { Injectable, EventEmitter, } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }    from 'rxjs/Observable';
import {jobDetails} from "../Models/jobDetails";


@Injectable()

export class JobinfoService {
    private headers = new Headers();
    private jobUrl = '/jobList';
    private jobnumberUrl = '/numberOfJobs';
    private usernumberUrl = '/numberOfUsers';
    // getjobDetail: EventEmitter<any>;

    constructor(
        private http: Http,
    ) {
    }

    getJobDetails() {
        return this.http.get(this.jobUrl, {headers: this.headers})
                        .map((response: Response) => response.json());
    }

    getNumberOfJobs() {
        return this.http.get(this.jobnumberUrl, {headers: this.headers})
                        .map((response: Response) => response.json());
    }

    getNumberOfUsers() {
        return this.http.get(this.usernumberUrl, {headers: this.headers})
                        .map((response: Response) => response.json());
    }

}

