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
var signupForm_1 = require("../Models/signupForm");
var signup_service_1 = require("./signup.service");
var SignupComponent = (function () {
    function SignupComponent(signupService, router) {
        this.signupService = signupService;
        this.router = router;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.signupform = new signupForm_1.signupForm("", "", "", "");
    };
    SignupComponent.prototype.add = function (form) {
        var _this = this;
        this.signupService
            .create(form)
            .subscribe(function (data) {
            _this.router.navigate(['/login']);
        }, function (error) {
            console.log(error);
        });
    };
    SignupComponent.prototype.clear = function () {
        this.signupform.email = '';
        this.signupform.username = '';
        this.signupform.password = '';
        this.signupform.password_again = '';
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        selector: 'signup',
        templateUrl: './app/signup/signup.component.html'
    }),
    __metadata("design:paramtypes", [signup_service_1.SignupService,
        router_1.Router])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map