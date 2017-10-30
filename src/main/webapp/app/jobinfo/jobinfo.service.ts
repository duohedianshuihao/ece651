import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }    from 'rxjs/Observable';


@Injectable()

export class JobinfoService {
    private headers = new Headers();
    private jobUrl = '/jobList';
    constructor(
        private http: Http,
    ) {}

    getJobDetails() {
        return this.http.get(this.jobUrl, {headers: this.headers})
                        .map((response: Response) => response.json());
    }
}

