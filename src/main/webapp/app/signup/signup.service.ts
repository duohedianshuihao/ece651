import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { URLSearchParams } from "@angular/http"


import 'rxjs/add/operator/toPromise';

import { signupForm } from '../Models/signupForm';

@Injectable()

export class SignupService {
    private headers = new Headers();
    private signUpUrl = 'http://localhost:8080/regUser';

    public user: signupForm[];

    constructor (
      private http: Http
    ) { }

    create (
      email: string,
      username: string,
      password: string): Promise<signupForm>{
        let body = JSON.stringify({
            email: email,
            userName: username,
            password: password
        });
        // let body = new URLSearchParams();
        // body.append('email', email);
        // body.append('username', username);
        // body.append('password', password);

        return this.http
            .post(this.signUpUrl, body, {headers: this.headers})
            .toPromise()
            .then(res => res.json().data as signupForm)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}