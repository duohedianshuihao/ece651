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
var http_1 = require("@angular/http");
var Rx = require("rxjs/Rx");
var ChatService = (function () {
    function ChatService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.baseUrl = 'ws://localhost:8080/messageSystem/';
        this.num = 0;
    }
    ChatService.prototype.create = function (jobId) {
        // 创建websocket对象
        var ws = new WebSocket(this.baseUrl + jobId);
        // 创建Observable对象
        var observable = Rx.Observable.create(function (obs) {
            ws.onmessage = function (evt) {
                obs.next(evt.data);
            };
            // 当websocket出错的时候，调用error方法，并传入失败信息
            ws.onerror = obs.error.bind(obs);
            // 当websocket关闭的时候，调用complete方法
            // obs.complete();
            return ws.close.bind(ws);
        });
        // 创建observer对象，用于向websocket发送信息
        var observer = {
            next: function (value) {
                // if (ws.readyState === WebSocket.OPEN) {
                //     console.log("sending" + value.toString());
                //     ws.send(value.toString());
                // } else {
                //     console.log("closed");
                // }
                var body = JSON.stringify({
                    user: value.user,
                    content: value.content,
                    time: value.time
                });
                console.log("body  " + body);
                ws.send(body);
            },
        };
        // 使用Rx.Subject.create创建Subject对象
        return Rx.Subject.create(observer, observable);
    };
    // 获取subject对象接口
    ChatService.prototype.getSubject = function (jobId) {
        if (!this.subject) {
            this.subject = this.create(jobId);
        }
        return this.subject;
    };
    // 获取publish对象接口
    ChatService.prototype.getPublish = function () {
        if (!this.publish) {
            this.publish = this.subject.publish();
        }
        return this.publish;
    };
    ChatService.prototype.userNumber = function (jobId) {
        var numUrl = "/chat/" + jobId;
        return this.http
            .get(numUrl, { headers: this.headers })
            .map(function (response) { return response.json(); });
    };
    return ChatService;
}());
ChatService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map