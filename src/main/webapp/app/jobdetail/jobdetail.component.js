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
var jobdetail_service_1 = require("./jobdetail.service");
var Subscription_1 = require("rxjs/Subscription");
var JobdetailComponent = (function () {
    function JobdetailComponent(jobdetailService) {
        var _this = this;
        this.jobdetailService = jobdetailService;
        this.subscription = new Subscription_1.Subscription();
        this.subscription = this.jobdetailService
            .getJobDetail()
            .subscribe(function (job) {
            _this.jobdetail = job.info;
        });
    }
    JobdetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return JobdetailComponent;
}());
JobdetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "jobdetail",
        templateUrl: "jobdetail.component.html",
        styleUrls: ['jobdetail.component.css']
    }),
    __metadata("design:paramtypes", [jobdetail_service_1.JobdetailService])
], JobdetailComponent);
exports.JobdetailComponent = JobdetailComponent;
//# sourceMappingURL=jobdetail.component.js.map