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
var jobinfo_service_1 = require("./jobinfo.service");
var JobinfoComponent = (function () {
    function JobinfoComponent(jobinfoService) {
        this.jobinfoService = jobinfoService;
        this.jobModels = [];
    }
    JobinfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        // console.log(this.jobModels);
        this.jobinfoService.getJobDetails().subscribe(function (jobModels) {
            _this.jobModels = jobModels;
        });
    };
    return JobinfoComponent;
}());
JobinfoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'jobinfo',
        templateUrl: 'jobinfo.component.html',
        styles: ['jobinfo.component.css']
    }),
    __metadata("design:paramtypes", [jobinfo_service_1.JobinfoService])
], JobinfoComponent);
exports.JobinfoComponent = JobinfoComponent;
//# sourceMappingURL=jobinfo.component.js.map