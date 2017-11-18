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
var Subject_1 = require("rxjs/Subject");
var http_1 = require("@angular/http");
var JobdetailService = (function () {
    function JobdetailService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.subject = new Subject_1.Subject();
    }
    JobdetailService.prototype.userView = function (user) {
        this.subject
            .next({ info: user });
    };
    JobdetailService.prototype.jobDetail = function (job) {
        // console.log(job);
        this.subject
            .next({ info: job });
    };
    JobdetailService.prototype.getJobDetails = function (jobId) {
        var jobdataUrl = "/jobs/" + jobId;
        return this.http.get(jobdataUrl, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    JobdetailService.prototype.getJobDetail = function () {
        return this.subject.asObservable();
    };
    JobdetailService.prototype.getUserview = function () {
        return this.subject.asObservable();
    };
    JobdetailService.prototype.getUserEmail = function (email) {
        console.log(email);
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append("email", email);
        var userEmailUrl = "/email";
        var requestOptions = new http_1.RequestOptions();
        requestOptions.search = urlSearchParams;
        return this.http.get(userEmailUrl, requestOptions)
            .map(function (response) { return response.json(); });
    };
    JobdetailService.prototype.getUser = function (userName) {
        var userUrl = "/" + userName;
        return this.http
            .get(userUrl, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    JobdetailService.prototype.addComment = function (comment, jobId) {
        var addcomentUrl = "/jobAddComments/" + jobId;
        var user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(comment);
        console.log(jobId);
        console.log(user.userName);
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.append('jobId', jobId);
        urlSearchParams.append('currentUser', user.userName);
        urlSearchParams.append('comment', comment);
        return this.http.post(addcomentUrl, urlSearchParams, { headers: this.headers })
            .map(function (response) { return response; });
    };
    ;
    return JobdetailService;
}());
JobdetailService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], JobdetailService);
exports.JobdetailService = JobdetailService;
//# sourceMappingURL=jobdetail.service.js.map