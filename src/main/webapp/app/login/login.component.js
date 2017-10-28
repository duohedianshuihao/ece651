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
var login_service_1 = require("./login.service");
var userProfile_1 = require("../Models/userProfile");
var loginForm_1 = require("../Models/loginForm");
var LoginComponent = (function () {
    function LoginComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginform = new loginForm_1.loginForm("", "");
        this.user = new userProfile_1.userProfile("", "");
    };
    LoginComponent.prototype.get = function (form) {
        var _this = this;
        this.loginService
            .login(form)
            .subscribe(function (data) {
            _this.router.navigate(['/jobinfo']);
        }, function (error) {
            console.log(error.json);
        });
    };
    LoginComponent.prototype.clear = function () {
        this.loginform.info = "";
        this.loginform.password = "";
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './app/login/login.component.html',
        styles: ['./app/login/login.component.css'],
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map