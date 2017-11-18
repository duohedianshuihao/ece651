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
            this.messages.push(JSON.parse(msg));
        });
        this.connection_get.connect();
    }

    ngOnDestroy() {

    }

    makeMsg(content) {
        this.message.user = this.currentUser.userName;
        this.message.content = content;
    }


    send() {
        this.connection_send.next(this.message);
    }

}