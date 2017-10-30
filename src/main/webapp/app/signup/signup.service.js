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
var SignupService = (function () {
    function SignupService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.signUpUrl = 'http://localhost:8080/regUser';
    }
    SignupService.prototype.create = function (form) {
        var body = JSON.stringify({
            email: form.email,
            userName: form.username,
            password: form.password
        });
        return this.http
            .post(this.signUpUrl, body, { headers: this.headers })
            .map(this.handleData.bind(this));
    };
    SignupService.prototype.handleData = function (response) {
        var body = response.json();
        if (body) {
            return body;
        }
        return body || {};
    };
    return SignupService;
}());
SignupService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SignupService);
exports.SignupService = SignupService;
//# sourceMappingURL=signup.service.js.map