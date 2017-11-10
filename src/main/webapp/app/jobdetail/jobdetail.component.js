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
var jobinfo_service_1 = require("../jobinfo/jobinfo.service");
var JobdetailComponent = (function () {
    function JobdetailComponent(jobinfoService, 
        // private jobdetailService: JobdetailService,
        // private alertService: AlertService,
        router) {
        this.jobinfoService = jobinfoService;
        this.router = router;
        // jobinfoService.getjobDetail.subscribe((emitjob:jobDetails)=>{
        //     this.jobdetail = emitjob;
        // })
    }
    JobdetailComponent.prototype.ngOnInit = function () {
        this.jobdetail = this.jobinfoService.jobdata;
        // console.log(this.jobinfoService.jobdata.jobTittle);
        // this.subscription = this.jobinfoService.getJobdetailEmitter()
        //     .subscribe(item => this.savejobdetail(item));
        // console.log(this.jobdetail.jobTittle);
    };
    return JobdetailComponent;
}());
JobdetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'jobdetail',
        templateUrl: 'jobdetail.component.html',
        styleUrls: ['jobdetail.component.css']
    }),
    __metadata("design:paramtypes", [jobinfo_service_1.JobinfoService,
        router_1.Router])
], JobdetailComponent);
exports.JobdetailComponent = JobdetailComponent;
//# sourceMappingURL=jobdetail.component.js.map