import { Injectable }    from '@angular/core';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';
import { Observable }    from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { signupForm } from '../Models/signupForm';

@Injectable()

export class SignupService {
    private headers = new Headers();
    private signUpUrl = '/regUser';

    public user: signupForm[];

    constructor (
      private http: Http,
    ) { }

    create (form: signupForm){
        let body = JSON.stringify({
            email: form.email,
            userName: form.username,
            password: form.password,
            userType: form.userType
        });

        return this.http
            .post(this.signUpUrl, body, {headers: this.headers})
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