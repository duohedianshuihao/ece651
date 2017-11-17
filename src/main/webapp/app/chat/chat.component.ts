import { Component, OnInit, OnDestroy } from "@angular/core";
import { ChatService } from "./chat.service";

@Component({
    moduleId: module.id,
    selector: "chat",
    templateUrl: "chat.component.html",
    styleUrls: ['chat.component.css'],
    providers: [ChatService]
})

export class ChatComponent implements OnInit, OnDestroy{
    message: string;
    connection_get: any;
    connection_send: any;
    messages = [];
    getMsg: any;
    constructor(
        private chatService: ChatService
    ) {}

    ngOnInit() {
        this.connection_send = this.chatService.getSubject();
        this.connection_get = this.chatService.getPublish();
        this.connection_get.subscribe(
            (msg) => {this.message = msg;
                    console.log("receive: " + this.message.toString());});
        this.connection_get.connect();
    }

    ngOnDestroy() {

    }


    // getM() {
    //     this.connection_get = this.chatService.getPublish();
    //     this.connection_get.subscribe(
    //         (msg) => {this.message = msg;
    //                 console.log("receive: " + this.message.toString());});
    //     this.connection_get.connect();
    // }

    send(message) {
        console.log(message);
        // this.connection_send = this.chatService.getSubject();
        this.connection_send.next(message);
    }

}