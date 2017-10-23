import { Injectable }    from '@angular/core';
import { Headers, Http, Response, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { loginForm } from '../Models/loginForm';

@Injectable()

export class LoginService {
  private headers = new Headers();
  private loginUrl = '/toLogin';
  public user : loginForm[];

  constructor(
      private http : Http,
      private router: Router
    ) { }

  login(form: loginForm): Observable<loginForm> {
    let body;
    if (this.check_info(form.info)) {
      body = JSON.stringify({
        email: form.info,
        password: form.password
      });
    }
    else{
      body = JSON.stringify({
        userName: form.info,
        password: form.password
      });
    }

    return this.http
           .post(this.loginUrl, body, { headers: this.headers})
           .map(this.handleData.bind(this));
  };

  private check_info(info: string) {

    const regPattern = new RegExp("^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$");
    let email : boolean = regPattern.test(info);
    return email;

  }

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