import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNav = false;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNav) {
                    // only keep for a single location change
                    this.keepAfterNav = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNav = false) {
        this.keepAfterNav = keepAfterNav;
        this.subject.next({ type: 'success', text: message.text });
    }

    error(message: string, keepAfterNav = false) {
        this.keepAfterNav = keepAfterNav;
        this.subject.next({ type: 'error', text: message.text });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}