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
var router_1 = require("@angular/router");
var jobinfo_service_1 = require("../jobinfo.service");
var jobdetail_service_1 = require("./jobdetail.service");
var jobDetails_1 = require("../../Models/jobDetails");
var alert_service_1 = require("../../alert/alert.service");
var JobdetailComponent = (function () {
    function JobdetailComponent(jobinfoService, jobdetailService, alertService, router) {
        this.jobinfoService = jobinfoService;
        this.jobdetailService = jobdetailService;
        this.alertService = alertService;
        this.router = router;
    }
    JobdetailComponent.prototype.ngOnInit = function () {
        // this.usercomment = new comments("", "", new Date);
    };
    JobdetailComponent.prototype.addComment = function (inputcomment) {
        var _this = this;
        if (inputcomment != "") {
            console.log(inputcomment);
            // this.usercomment.comment = inputcomment;
            // this.usercomment.replier = localStorage.getItem('currentUser');
            // this.usercomment.commentTime = new Date();
            this.jobdetailService
                .create(inputcomment, this.jobdetail.jobId)
                .subscribe(function (data) {
                _this.router.navigate(['/jobInfo']);
                _this.alertService.success('Registration successful', true);
            }, function (error) {
                _this.alertService.error(error.text());
            });
        }
        else {
            console.log("nothing in it!!");
        }
    };
    JobdetailComponent.prototype.goback = function () {
        localStorage.removeItem("jobdetail");
        window.location.reload();
    };
    return JobdetailComponent;
}());
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
    __metadata("design:paramtypes", [jobinfo_service_1.JobinfoService,
        jobdetail_service_1.JobdetailService,
        alert_service_1.AlertService,
        router_1.Router])
], JobdetailComponent);
exports.JobdetailComponent = JobdetailComponent;
//# sourceMappingURL=jobdetail.component.js.map