"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
    }
    UserService.prototype.getUser = function (userName) {
        var userUrl = "/" + userName;
        return this.http.get(userUrl, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.updateEmail = function (user, currentUser) {
        var updateUrl = "/" + currentUser.userName + "/changeEmail";
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('password', currentUser.password);
        urlSearchParams.append('newEmail', user.email);
        return this.http.post(updateUrl, urlSearchParams, { headers: this.headers })
            .map(function (response) { response.json(); });
    };
    UserService.prototype.updateUserName = function (user, currentUser) {
        var updateUrl = "/" + currentUser.userName + "/changeUserName";
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('password', currentUser.password);
        urlSearchParams.append('newUserName', user.userName);
        return this.http.post(updateUrl, urlSearchParams, { headers: this.headers })
            .map(function (response) { response.json(); });
    };
    UserService.prototype.updatePassword = function (password, currentUser) {
        var updateUrl = "/" + currentUser.userName + "/changePassword";
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('password', password.newPassword);
        return this.http.post(updateUrl, urlSearchParams, { headers: this.headers })
            .map(function (response) { response.json(); });
    };
    UserService.prototype.updateSkills = function (user, currentUser) {
        var updateUrl = "/" + currentUser.userName + "/updateSkills";
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('userName', currentUser.userName);
        urlSearchParams.append('skills', user.skills);
        return this.http.post(updateUrl, urlSearchParams, { headers: this.headers })
            .map(function (response) { response.json(); });
    };
    UserService.prototype.check_password = function (password, currentUser) {
        var checkUrl = "/toLogin";
        var body = JSON.stringify({
            userName: currentUser.userName,
            password: password.oldPassword
        });
        return this.http.post(checkUrl, body, { headers: this.headers })
            .map(function (response) { response.json(); });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map