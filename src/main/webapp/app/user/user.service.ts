import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable }    from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { userProfile } from '../Models/userProfile';

@Injectable()

export class UserService {
    private headers = new Headers();
    constructor(
        private http: Http
    ) {}

    getUser(userName) {
        let userUrl = "/"+ userName;
        return this.http.get(userUrl, {headers: this.headers})
                        .map((response: Response) => response.json());
    }


}