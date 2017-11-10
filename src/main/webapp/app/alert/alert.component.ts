import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from './alert.service';

@Component({
    moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styles: ['alert.component.css']
})

export class AlertComponent implements OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService)
    {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            this.message = message;
            console.log(this.message);
        });
    }

    ngOnDestroy():void {
        this.subscription.unsubscribe();
    }
}