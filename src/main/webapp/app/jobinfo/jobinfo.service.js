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
var router_1 = require("@angular/router");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var JobinfoService = (function () {
    function JobinfoService(http, router) {
        this.http = http;
        this.router = router;
        this.headers = new http_1.Headers();
        this.jobinfoUrl = '/jobinfo';
    }
    JobinfoService.prototype.login = function (form) {
        var body;
        // if (this.check_info(form.jobTitle)) {
        //     body = JSON.stringify({
        //         jobTitle: form.jobTitle,
        //         jobDescription: form.jobDescription,
        //         startTime: form.startTime,
        //         expirTime: form.expirTime,
        //         location: form.location,
        //         comment: form.comment
        //     });
        // }
        // else{
        body = JSON.stringify({
            jobTitle: form.jobTitle,
            jobDescription: form.jobDescription,
            startTime: form.startTime,
            expirTime: form.expirTime,
            location: form.location,
            comment: form.comment
        });
        // }
        return this.http
            .post(this.jobinfoUrl, body, { headers: this.headers })
            .map(this.handleData.bind(this));
    };
    ;
    // private check_info(info: string) {
    //     const regPattern = new RegExp("^[a-z0-9A-Z]+([._\\-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$");
    //     let email : boolean = regPattern.test(info);
    //     return email;
    // }
    JobinfoService.prototype.handleData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('bad response status: ' + res.status);
        }
        else {
            this.router.navigate(['/']);
        }
        var body = res.json().data;
        return body || {};
    };
    return JobinfoService;
}());
JobinfoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router])
], JobinfoService);
exports.JobinfoService = JobinfoService;
//# sourceMappingURL=jobinfo.service.js.map