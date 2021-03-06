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
var jobinfo_service_1 = require("./jobinfo.service");
var navbar_service_1 = require("../navbar/navbar.service");
var JobinfoComponent = (function () {
    // public totalPages: number;
    // public curPage: number;
    // public pageContent: Array<[any]>;
    // public arrIndex: number[] = [];
    function JobinfoComponent(jobinfoService, navbarService, router) {
        this.jobinfoService = jobinfoService;
        this.navbarService = navbarService;
        this.router = router;
        this.jobModels = [];
        this.inJobInfo = true;
    }
    JobinfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.jobinfoService
            .getJobDetails()
            .subscribe(function (jobModels) {
            _this.jobModels = jobModels;
            // this.totalPages = Math.ceil(this.jobModels.length / 6);
            // for (var i = 0; i < this.totalPages; ++i) {
            //     this.arrIndex.push(i + 1);
            // };
        }, function (error) {
            console.log(error);
        });
        // this.jobinfoService.getNumberOfJobs().subscribe(numberOfJob => {
        //       this.numberOfJobs = numberOfJob;
        //   });
        this.jobinfoService.getNumberOfUsers().subscribe(function (numberOfUser) {
            _this.numberOfUsers = numberOfUser;
        });
    };
    JobinfoComponent.prototype.searchJob = function (jobs) {
        this.jobModels = jobs;
    };
    return JobinfoComponent;
}());
JobinfoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'jobinfo',
        templateUrl: 'jobinfo.component.html',
        styleUrls: ['jobinfo.component.css']
    }),
    __metadata("design:paramtypes", [jobinfo_service_1.JobinfoService,
        navbar_service_1.NavbarService,
        router_1.Router])
], JobinfoComponent);
exports.JobinfoComponent = JobinfoComponent;
//# sourceMappingURL=jobinfo.component.js.map