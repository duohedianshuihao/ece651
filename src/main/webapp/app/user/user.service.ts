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
        let userUrl = "/" + userName;
        return this.http.get(userUrl, {headers: this.headers})
                        .map((response: Response) => response.json());
    }

    updateEmail(user, currentUser) {
        let updateUrl = "/" + currentUser.userName + "/changeEmail";
        let body = JSON.stringify({
            userName: currentUser.userName,
            password: currentUser.password,
            newEmail: user.email
        });
        return this.http.post(updateUrl, body, {headers: this.headers})
                        .map((response: Response) => {response.json()});
    }

    updateUserName(user, currentUser) {
        let updateUrl = "/" + currentUser.userName + "/changeUserName";
        let body = JSON.stringify({
            userName: currentUser.userName,
            password: currentUser.password,
            newUserName: user.userName
        });
        return this.http.post(updateUrl, body, {headers: this.headers})
                        .map((response: Response) => {response.json()});
    }

    updatePassword(password, currentUser) {
        let updateUrl = "/" + currentUser.userName + "/changePassword";
        let body = JSON.stringify({
            userName: currentUser.userName,
            password: password.newPassword
        });
        return this.http.post(updateUrl, body, {headers: this.headers})
                        .map((response: Response) => {response.json()});
    }

    updateSkills(user, currentUser) {
        let updateUrl = "/" + currentUser.userName + "/updateSkills";
        let body = JSON.stringify({
            userName: currentUser.userName,
            skills: user.skills
        });
        return this.http.post(updateUrl, body, {headers: this.headers})
                        .map((response: Response) => {response.json()});
    }

    check_password(password, currentUser) {
        let checkUrl = "/toLogin";
        let body = JSON.stringify({
            userName: currentUser.userName,
            password: password.oldPassword
        });
        return this.http.post(checkUrl, body, {headers: this.headers})
                        .map((response: Response) => {response.json()});
    }

}