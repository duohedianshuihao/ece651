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
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.loginUrl = '/toLogin';
        this.subject = new Subject_1.Subject();
        this.keepAfterNav = false;
    }
    LoginService.prototype.login = function (form) {
        var body;
        if (this.check_info(form.info)) {
            body = JSON.stringify({
                email: form.info,
                password: form.password
            });
        }
        else {
            body = JSON.stringify({
                userName: form.info,
                password: form.password
            });
        }
        return this.http
            .post(this.loginUrl, body, { headers: this.headers })
            .map(this.handleData.bind(this));
    };
    ;
    LoginService.prototype.errMsg = function (msg, keepAfterNav) {
        if (keepAfterNav === void 0) { keepAfterNav = false; }
        this.keepAfterNav = keepAfterNav;
        this.subject.next({ type: 'error', text: msg });
    };
    LoginService.prototype.check_info = function (info) {
        var regPattern = new RegExp("^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$");
        var email = regPattern.test(info);
        return email;
    };
    LoginService.prototype.handleData = function (response) {
        var body = response.json();
        if (body) {
            localStorage.setItem('currentUser', JSON.stringify(body));
            return body;
        }
        ;
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map