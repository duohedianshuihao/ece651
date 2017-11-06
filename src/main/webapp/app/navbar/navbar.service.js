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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var NavbarService = (function () {
    function NavbarService(router, http) {
        this.router = router;
        this.http = http;
    }
    NavbarService.prototype.searchJob = function (searchWords) {
        var searchUrl = "/searchEngine";
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.set("content", searchWords);
        this.http.get(searchUrl, urlSearchParams);
    };
    return NavbarService;
}());
NavbarService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        http_1.Http])
], NavbarService);
exports.NavbarService = NavbarService;
var params = new http_1.URLSearchParams();
params.set('appid', StaticSettings.API_KEY);
params.set('cnt', days.toString());
//Http request-
return this.http.get(StaticSettings.BASE_URL, {
    search: params
}).subscribe(function (response) { return _this.onGetForecastResult(response.json()); }, function (error) { return _this.onGetForecastError(error.json()); }, function () { return _this.onGetForecastComplete(); });
//# sourceMappingURL=navbar.service.js.map