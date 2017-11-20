import { Injectable } from "@angular/core";
import { Headers, Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable()

export class ChatService {
    private socket;
    private headers = new Headers();
    baseUrl: string = 'ws://localhost:8080/messageSystem/';
    constructor(
        private http: Http
        ) {
    }

    subject: Rx.Subject<any>;
    // 用于保存当前subject对象publish后返回的可观察对象
    publish: Rx.ConnectableObservable<any>;
    num: number = 0;
    private create(jobId): Rx.Subject<any>{
        // 创建websocket对象
        let ws = new WebSocket(this.baseUrl + jobId);
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
                let body = JSON.stringify({
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
    }
    // 获取subject对象接口
    getSubject(jobId) {
      if (!this.subject) {
        this.subject = this.create(jobId);
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

    userNumber(jobId) {
        let numUrl = "/chat/" + jobId;
        return this.http
                   .get(numUrl, {headers: this.headers})
                   .map((response: Response) => response.json());

    }

}