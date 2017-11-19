import { Component, OnInit, OnDestroy } from "@angular/core";
import { ChatService } from "./chat.service";

@Component({
    moduleId: module.id,
    selector: "chat",
    templateUrl: "chat.component.html",
    styleUrls: ['chat.component.css'],
    providers: [ ChatService ]
})

export class ChatComponent implements OnInit, OnDestroy{
    content: string;
    message: any = {};
    connection_get: any;
    connection_send: any;
    getMsg: any;
    currentUser: any;
    messages: any = [];
    jobId: any;

    constructor(
        private chatService: ChatService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.jobId = localStorage.getItem("jobId");
        this.message.time = new Date();

        setInterval(() => {
                this.message.time =  new Date();
             }, 1000);
    }

    ngOnInit() {
        this.connection_send = this.chatService.getSubject(this.jobId);
        this.connection_get = this.chatService.getPublish();
        this.connection_get.subscribe((msg) => {
            let tmp: any = JSON.parse(msg);
            if (tmp.user == this.currentUser.userName) {
                tmp.user = "me";
            }
            this.messages.push(tmp);
        });
        this.connection_get.connect();
    }

    ngOnDestroy() {

    }

    send(content) {
        if (content) {
            this.message.user = this.currentUser.userName;
            this.message.content = content;
            this.content = "";
            // send
            this.connection_send.next(this.message);
            this.message = {};
        }
    }

    clear() {
        this.messages = [];
    }


}