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
var login_service_1 = require("../login/login.service");
var navbar_service_1 = require("./navbar.service");
var alert_service_1 = require("../alert/alert.service");
var jobinfo_service_1 = require("../jobinfo/jobinfo.service");
var router_1 = require("@angular/router");
var NavbarComponent = (function () {
    function NavbarComponent(router, loginService, navbarService, alertService, jobinfoService) {
        this.router = router;
        this.loginService = loginService;
        this.navbarService = navbarService;
        this.alertService = alertService;
        this.jobinfoService = jobinfoService;
        this.jobUpdate = new core_1.EventEmitter();
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.searchWord = "";
    };
    NavbarComponent.prototype.logout = function () {
        // localStorage.removeItem('currentUser');
        this.loginService.logout();
        // following function would not work if nothing changed
        // this.router.navigate(['jobList']);
        // location.reload();
        if (window.location.href == "http://localhost:8080/") {
            location.reload();
        }
        else {
            this.router.navigate(['']);
        }
    };
    NavbarComponent.prototype.searchJob = function (word) {
        var _this = this;
        this.navbarService
            .search(word)
            .subscribe(function (jobs) {
            _this.jobUpdate.emit(jobs);
            _this.searchWord = "";
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    NavbarComponent.prototype.postjob = function () {
        this.router.navigate((['/postjob']));
    };
    NavbarComponent.prototype.redirect = function () {
        this.router.navigate(['/userprofile']);
    };
    return NavbarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NavbarComponent.prototype, "inJobInfo", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NavbarComponent.prototype, "jobUpdate", void 0);
NavbarComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'navbar',
        templateUrl: 'navbar.component.html',
        styleUrls: ['navbar.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        login_service_1.LoginService,
        navbar_service_1.NavbarService,
        alert_service_1.AlertService,
        jobinfo_service_1.JobinfoService])
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map