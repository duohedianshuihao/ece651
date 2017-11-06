import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
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
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('password', currentUser.password);
        urlSearchParams.append('newEmail', user.email);
        return this.http.post(updateUrl, urlSearchParams, {headers: this.headers})
                        .map((response: Response) => {response.json()});
    }

    updateUserName(user, currentUser) {
        let updateUrl = "/" + currentUser.userName + "/changeUserName";
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('password', currentUser.password);
        urlSearchParams.append('newUserName', user.userName);
        return this.http.post(updateUrl, urlSearchParams, {headers: this.headers})
                        .map((response: Response) => {response.json()});
    }

    updatePassword(password, currentUser) {
        let updateUrl = "/" + currentUser.userName + "/changePassword";
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('password', password.newPassword);
        return this.http.post(updateUrl, urlSearchParams, {headers: this.headers})
                        .map((response: Response) => {response.json()});
    }

    updateSkills(user, currentUser) {
        let updateUrl = "/" + currentUser.userName + "/updateSkills";
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('skills', user.skills);
        return this.http.post(updateUrl, urlSearchParams, {headers: this.headers})
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