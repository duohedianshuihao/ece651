import { Injectable }    from '@angular/core';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { signupForm } from '../Models/signupForm';

@Injectable()

export class SignupService {
    private headers = new Headers();
    private signUpUrl = 'http://localhost:8080/regUser';

    public user: signupForm[];

    constructor (
      private http: Http,
      private router: Router
    ) { }

    create (form: signupForm): Observable<signupForm[]>{
        let body = JSON.stringify({
            email: form.email,
            userName: form.username,
            password: form.password
        });

        return this.http
            .post(this.signUpUrl, body, {headers: this.headers})
            .map(this.handleData.bind(this));
    }

    private handleData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('bad response status: ' + res.status);
        }
        else {
            this.router.navigate(['/login']);
        }
        let body = res.json().data;
        return body || { };
    }
}