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
var PostjobService = (function () {
    function PostjobService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.postjobUrl = '/newJob';
    }
    PostjobService.prototype.create = function (form) {
        var body = JSON.stringify({
            // jobId: form.jobId,
            jobTittle: form.jobTittle,
            jobDescription: form.jobDescription,
            company: form.company,
            requiredSkills: form.requiredSkills,
            // createdTime: form.createdTime,
            startTime: form.startTime,
            expirTime: form.expirTime,
            location: form.location,
            categories: form.categories,
        });
        return this.http
            .post(this.postjobUrl, body, { headers: this.headers })
            .map(this.handleData.bind(this));
    };
    PostjobService.prototype.handleData = function (response) {
        var body = response.json();
        if (body) {
            if (localStorage.getItem('jobId') != null) {
                localStorage.removeItem('jobId');
            }
            this.thisjob = JSON.parse(JSON.stringify(body));
            localStorage.setItem('jobId', this.thisjob.jobId);
            return body;
        }
        return body || {};
    };
    return PostjobService;
}());
PostjobService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PostjobService);
exports.PostjobService = PostjobService;
//# sourceMappingURL=postjob.service.js.map