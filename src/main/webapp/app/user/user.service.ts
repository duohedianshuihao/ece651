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
        return this.http
                    .get(userUrl, {headers: this.headers})
                    .map((response: Response) => response.json()); // why there should not be {}
    }

    updateEmail(user, currentUser) {
        let updateUrl = "/" + currentUser.userName + "/changeEmail";
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('password', currentUser.password);
        urlSearchParams.append('newEmail', user.email);
        return this.http.post(updateUrl, urlSearchParams, {headers: this.headers})
                        .map((response: Response) => response);
                        // just return a message not a json
    }

    updateUserName(user, currentUser) {
        let updateUrl = "/" + currentUser.userName + "/changeUserName";
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('password', currentUser.password);
        urlSearchParams.append('newUserName', user.userName);
        return this.http.post(updateUrl, urlSearchParams, {headers: this.headers})
                        .map((response: Response) => response);
    }

    updatePassword(password, currentUser) {
        let updateUrl = "/" + currentUser.userName + "/changePassword";
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('password', password.oldPassword);
        urlSearchParams.append('newPassword', password.newPassword);
        return this.http.post(updateUrl, urlSearchParams, {headers: this.headers})
                        .map((response: Response) => response);
    }

    updateSkills(user) {
        let updateUrl = "/" + user.userName + "/updateSkills";
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('userName', user.userName);
        urlSearchParams.append('skills', user.skills.toString());
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