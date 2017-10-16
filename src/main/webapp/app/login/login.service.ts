import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { loginForm } from '../Models/loginForm';

@Injectable()

export class LoginService {
  private headers = new Headers();
  private loginUrl = '/toLogin';

  public user : loginForm[];

  constructor(
      private http : Http
    ) { }

  get(info: string, password: string): Promise<loginForm> {
    // let body = JSON.stringify({
    //     email: email,
    //     password: password
    // });

    return this.http
           .post(this.loginUrl, body, { headers: this.headers})
           .toPromise()
           .then(res => res.json().data as loginForm)
           .catch(this.handleError);
  };

  private check_info(info: string) {

  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}