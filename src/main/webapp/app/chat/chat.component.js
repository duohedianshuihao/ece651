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
var chat_service_1 = require("./chat.service");
var ChatComponent = (function () {
    function ChatComponent(chatService) {
        var _this = this;
        this.chatService = chatService;
        this.message = {};
        this.messages = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.jobId = localStorage.getItem("jobId");
        this.message.time = new Date();
        setInterval(function () {
            _this.message.time = new Date();
        }, 1000);
        setInterval(function () {
            _this.getNumber();
        }, 60000);
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.connection_send = this.chatService.getSubject(this.jobId);
        this.connection_get = this.chatService.getPublish();
        this.connection_get.subscribe(function (msg) {
            var tmp = JSON.parse(msg);
            if (tmp.user == _this.currentUser.userName) {
                tmp.user = "me";
            }
            _this.messages.push(tmp);
        });
        this.connection_get.connect();
        this.getNumber();
    };
    ChatComponent.prototype.ngOnDestroy = function () {
    };
    ChatComponent.prototype.send = function (content) {
        if (content) {
            this.message.user = this.currentUser.userName;
            this.message.content = content;
            this.content = "";
            // send
            this.connection_send.next(this.message);
            this.message = {};
        }
    };
    ChatComponent.prototype.getNumber = function () {
        var _this = this;
        this.chatService
            .userNumber(this.jobId)
            .subscribe(function (num) {
            console.log(num);
            _this.userNumber = num;
        }, function (error) {
            console.log(error);
        });
    };
    ChatComponent.prototype.clear = function () {
        this.messages = [];
    };
    return ChatComponent;
}());
ChatComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "chat",
        templateUrl: "chat.component.html",
        styleUrls: ['chat.component.css'],
        providers: [chat_service_1.ChatService]
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map