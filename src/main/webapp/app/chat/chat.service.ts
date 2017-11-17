import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable()

export class ChatService {
    private socket;
    wsUrl: string = 'ws://localhost:8080/messageSystem/3802208a-3e43-405e-908c-c2c6f5904fe8';
    constructor() {
    }

    subject: Rx.Subject<any>;
    // 用于保存当前subject对象publish后返回的可观察对象
    publish: Rx.ConnectableObservable<any>;
    num: number = 0;
    private create(): Rx.Subject<any>{
        // 创建websocket对象
        let ws = new WebSocket(this.wsUrl);
        // 创建Observable对象
        let observable = Rx.Observable.create(
            (obs: Rx.Observer<any>) => {

                ws.onmessage = (evt) => {
                    obs.next(evt.data);
                }
                // 当websocket出错的时候，调用error方法，并传入失败信息
                ws.onerror = obs.error.bind(obs);
                // 当websocket关闭的时候，调用complete方法
                // obs.complete();
                return ws.close.bind(ws);
            }
        );

        // 创建observer对象，用于向websocket发送信息
        let observer = {
            next: (value) => {
                // if (ws.readyState === WebSocket.OPEN) {
                //     console.log("sending" + value.toString());
                //     ws.send(value.toString());
                // } else {
                //     console.log("closed");
                // }
                ws.send(value.toString());
            },
        };
        // 使用Rx.Subject.create创建Subject对象
        return Rx.Subject.create(observer, observable);
    }
    // 获取subject对象接口
    getSubject() {
      if (!this.subject) {
        this.subject = this.create();
      }
      return this.subject;
    }
    // 获取publish对象接口
    getPublish() {
        if (!this.publish) {
            this.publish = this.subject.publish();
        }
        return this.publish;
    }

}