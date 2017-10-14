import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { signupForm } from '../Models/signupForm';

@Injectable()

export class SignupService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private loginUrl = '/regUser';

    public user: signupForm[];

    constructor (
      private http: Http
    ) { }

    create (
      email: string,
      username: string,
      password: string): Promise<signupForm>{
        return this.http
          .post(this.loginUrl, JSON.stringify({
            email: email,
            username: username,
            password: password
          }))
          .toPromise()
          .then(res => res.json().data as signupForm)
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}