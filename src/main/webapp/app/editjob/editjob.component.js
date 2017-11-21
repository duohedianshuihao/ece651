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
var alert_service_1 = require("../alert/alert.service");
var postjob_service_1 = require("../postjob/postjob.service");
var jobdetail_service_1 = require("../jobdetail/jobdetail.service");
var common_1 = require("@angular/common");
var EditjobComponent = (function () {
    function EditjobComponent(postjobService, alertService, router, jobdetailService, datePipe) {
        this.postjobService = postjobService;
        this.alertService = alertService;
        this.router = router;
        this.jobdetailService = jobdetailService;
        this.datePipe = datePipe;
    }
    EditjobComponent.prototype.ngOnInit = function () {
        this.jobform = this.jobdetailService.jobform;
    };
    EditjobComponent.prototype.add = function (form) {
        var _this = this;
        this.postjobService
            .update(form)
            .subscribe(function (data) {
            _this.router.navigate(['/jobdetail']);
            _this.alertService.success('Post Job successful', true);
        }, function (error) {
            console.log('there ' + error);
            // this.alertService.error(error.text());
        });
    };
    EditjobComponent.prototype.add_skills = function (skill) {
        var skills = skill.split(',');
        for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
            var item = skills_1[_i];
            if (!this.jobform.requiredSkills.includes(item)) {
                this.jobform.requiredSkills.push(item);
            }
        }
        this.skill = "";
    };
    EditjobComponent.prototype.remove_skills = function (skill) {
        this.jobform.requiredSkills = this.jobform.requiredSkills.filter(function (obj) { return obj !== skill; });
        console.log(this.jobform.requiredSkills);
    };
    return EditjobComponent;
}());
EditjobComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "editjob",
        templateUrl: "editjob.component.html",
        styleUrls: ['editjob.component.css'],
        providers: [common_1.DatePipe]
    }),
    __metadata("design:paramtypes", [postjob_service_1.PostjobService,
        alert_service_1.AlertService,
        router_1.Router,
        jobdetail_service_1.JobdetailService,
        common_1.DatePipe])
], EditjobComponent);
exports.EditjobComponent = EditjobComponent;
//# sourceMappingURL=editjob.component.js.map