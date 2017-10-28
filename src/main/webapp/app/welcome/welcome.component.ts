import { Component, Input } from "@angular/core";
import { userProfile } from '../Models/userProfile';
import { WelcomeService } from './welcome.service';

@Component({
    selector: "welcome",
    templateUrl: "./app/welcome/welcome.component.html",
    providers: [WelcomeService]
})

export class WelcomeComponent {
    constructor() {
    }

}