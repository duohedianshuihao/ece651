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

  login(info: string, password: string): Promise<loginForm> {
    let body;
    if (this.check_info(info)) {
      body = JSON.stringify({
        email: info,
        password: password
      });
    }
    else{
      body = JSON.stringify({
        userName: info,
        password: password
      });
    }

    return this.http
           .post(this.loginUrl, body, { headers: this.headers})
           .toPromise()
           .then(res => res.json().data as loginForm)
           .catch(this.handleError);
  };

  private check_info(info: string) {
    let email : boolean = info.includes("@");
    return email;
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}