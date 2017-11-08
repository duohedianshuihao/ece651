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
var jobinfo_service_1 = require("../jobinfo.service");
var jobDetails_1 = require("../../Models/jobDetails");
var JobdetailComponent = (function () {
    function JobdetailComponent(jobinfoService) {
        this.jobinfoService = jobinfoService;
    }
    JobdetailComponent.prototype.ngOnInit = function () {
    };
    return JobdetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], JobdetailComponent.prototype, "jobId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], JobdetailComponent.prototype, "jobTitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], JobdetailComponent.prototype, "jobDescription", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], JobdetailComponent.prototype, "company", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], JobdetailComponent.prototype, "requiredSkills", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], JobdetailComponent.prototype, "createdTime", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], JobdetailComponent.prototype, "startTime", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], JobdetailComponent.prototype, "expirTime", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], JobdetailComponent.prototype, "location", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], JobdetailComponent.prototype, "categories", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Comment)
], JobdetailComponent.prototype, "comments", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", jobDetails_1.jobDetails)
], JobdetailComponent.prototype, "jobdetail", void 0);
JobdetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'jobdetail',
        templateUrl: 'jobdetail.component.html',
        styleUrls: ['jobdetail.component.css']
    }),
    __metadata("design:paramtypes", [jobinfo_service_1.JobinfoService])
], JobdetailComponent);
exports.JobdetailComponent = JobdetailComponent;
//# sourceMappingURL=jobdetail.component.js.map