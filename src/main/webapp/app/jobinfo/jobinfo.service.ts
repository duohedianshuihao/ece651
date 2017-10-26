import { Injectable }    from '@angular/core';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { jobinfoForm } from '../Models/jobinfoForm';

@Injectable()

export class JobinfoService {
    private headers = new Headers();
    private jobinfoUrl = '/jobinfo';
    public user : jobinfoForm[];

    constructor(
        private http : Http,
        private router: Router
    ) { }

    login(form: jobinfoForm): Observable<jobinfoForm> {
        let body;
        // if (this.check_info(form.jobTitle)) {
        //     body = JSON.stringify({
        //         jobTitle: form.jobTitle,
        //         jobDescription: form.jobDescription,
        //         startTime: form.startTime,
        //         expirTime: form.expirTime,
        //         location: form.location,
        //         comment: form.comment
        //     });
        // }
        // else{
            body = JSON.stringify({
                jobTitle: form.jobTitle,
                jobDescription: form.jobDescription,
                startTime: form.startTime,
                expirTime: form.expirTime,
                location: form.location,
                comment: form.comment
            });
        // }

        return this.http
            .post(this.jobinfoUrl, body, { headers: this.headers})
            .map(this.handleData.bind(this));
    };

    // private check_info(info: string) {
    //     const regPattern = new RegExp("^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$");
    //     let email : boolean = regPattern.test(info);
    //     return email;
    // }

    private handleData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('bad response status: ' + res.status);
        }
        else {
            this.router.navigate(['/']);
        }
        let body = res.json().data;
        return body || { };
    }
}