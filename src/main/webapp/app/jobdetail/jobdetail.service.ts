import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Headers, Http, Response, URLSearchParams,RequestOptions } from '@angular/http';
import { jobDetails } from "../Models/jobDetails";
import { userProfile } from "../Models/userProfile";


@Injectable()

export class JobdetailService {
    private headers = new Headers();
    constructor(
        private http : Http,
        ) {}
    private subject = new Subject<any>();
    public jobform:jobDetails;

    userView(user: userProfile) {
        this.subject
            .next({info: user});
    }

    jobDetail(job: jobDetails) {
        // console.log(job);
        this.subject
            .next({info: job});
    }

    getJobDetails(jobId) {
        let jobdataUrl = "/jobs/" + jobId;
        return this.http.get(jobdataUrl, {headers: this.headers})
                        .map((response: Response) => response.json());
    }

    getJobDetail(): Observable<any> {
        return this.subject.asObservable();
    }

    getUserview(): Observable<any> {
        return this.subject.asObservable();
    }

    getUserEmail(email) {
        console.log(email);
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append("email", email);
        let userEmailUrl = "/email";
        let requestOptions = new RequestOptions();
        requestOptions.search = urlSearchParams;
        return this.http.get(userEmailUrl, requestOptions)
            .map((response: Response) => response.json());
    }

    getUser(userName) {
        let userUrl = "/" + userName;
        return this.http
            .get(userUrl, {headers: this.headers})
            .map((response: Response) => response.json());
    }

    addComment(comment:string, jobId:string) {
        let addcomentUrl = "/jobAddComments/"+ jobId;
        let user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(comment);
        console.log(jobId);
        console.log(user.userName);
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('jobId', jobId);
        urlSearchParams.append('currentUser', user.userName );
        urlSearchParams.append('comment', comment);
        return this.http.post(addcomentUrl, urlSearchParams, {headers: this.headers})
            .map((response: Response) => response);
    };

}