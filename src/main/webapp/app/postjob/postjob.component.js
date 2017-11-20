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
var jobDetails_1 = require("../Models/jobDetails");
var postjob_service_1 = require("./postjob.service");
var alert_service_1 = require("../alert/alert.service");
var router_1 = require("@angular/router");
var PostjobComponent = (function () {
    function PostjobComponent(postjobService, alertService, router) {
        this.postjobService = postjobService;
        this.alertService = alertService;
        this.router = router;
    }
    PostjobComponent.prototype.ngOnInit = function () {
        var company = null;
        this.jobform = new jobDetails_1.jobDetails("", "", "", company, new Array(), new Date(), new Date(), new Date(), "", "", new Array());
    };
    PostjobComponent.prototype.add = function (form) {
        var _this = this;
        form.company = JSON.parse(localStorage.getItem("currentUser"));
        this.postjobService
            .create(form)
            .subscribe(function (data) {
            _this.router.navigate(['/jobdetail']);
            _this.alertService.success('Post Job successful', true);
        }, function (error) {
            console.log('there ' + error);
            // this.alertService.error(error.text());
        });
    };
    PostjobComponent.prototype.add_skills = function (skill) {
        var skills = skill.split(',');
        for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
            var item = skills_1[_i];
            if (!this.jobform.requiredSkills.includes(item)) {
                this.jobform.requiredSkills.push(item);
            }
        }
        console.log(this.jobform.requiredSkills);
        this.skill = "";
    };
    PostjobComponent.prototype.remove_skills = function (skill) {
        this.jobform.requiredSkills = this.jobform.requiredSkills.filter(function (obj) { return obj !== skill; });
        console.log(this.jobform.requiredSkills);
    };
    return PostjobComponent;
}());
PostjobComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "postjob",
        templateUrl: "postjob.component.html",
        styleUrls: ['postjob.component.css']
    }),
    __metadata("design:paramtypes", [postjob_service_1.PostjobService,
        alert_service_1.AlertService,
        router_1.Router])
], PostjobComponent);
exports.PostjobComponent = PostjobComponent;
//# sourceMappingURL=postjob.component.js.map