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
var jobinfoForm_1 = require("../Models/jobinfoForm");
var jobinfo_service_1 = require("./jobinfo.service");
var JobinfoComponent = (function () {
    function JobinfoComponent(jobinfoService) {
        this.jobinfoService = jobinfoService;
        this.form = new jobinfoForm_1.jobinfoForm("WCNM", "", new Date(), new Date(), "", "");
    }
    JobinfoComponent.prototype.get = function (form) {
        this.jobinfoService
            .login(form)
            .subscribe();
    };
    JobinfoComponent.prototype.clear = function () {
        this.form.jobTitle = "";
        this.form.jobDescription = "";
        this.form.startTime = new Date();
        this.form.expirTime = new Date();
        this.form.location = "";
        this.form.comment = "";
    };
    return JobinfoComponent;
}());
JobinfoComponent = __decorate([
    core_1.Component({
        selector: 'jobinfo',
        templateUrl: './app/jobinfo/jobinfo.component.html'
    }),
    __metadata("design:paramtypes", [jobinfo_service_1.JobinfoService])
], JobinfoComponent);
exports.JobinfoComponent = JobinfoComponent;
//# sourceMappingURL=jobinfo.component.js.map