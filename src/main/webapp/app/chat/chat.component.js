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
        this.chatService = chatService;
        this.messages = [];
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.connection_send = this.chatService.getSubject();
        this.connection_get = this.chatService.getPublish();
        this.connection_get.subscribe(function (msg) {
            _this.message = msg;
            console.log("receive: " + _this.message.toString());
        });
        this.connection_get.connect();
    };
    ChatComponent.prototype.ngOnDestroy = function () {
    };
    // getM() {
    //     this.connection_get = this.chatService.getPublish();
    //     this.connection_get.subscribe(
    //         (msg) => {this.message = msg;
    //                 console.log("receive: " + this.message.toString());});
    //     this.connection_get.connect();
    // }
    ChatComponent.prototype.send = function (message) {
        console.log(message);
        // this.connection_send = this.chatService.getSubject();
        this.connection_send.next(message);
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