import { Component, Input } from "@angular/core";
import { userProfile } from '../Models/userProfile';
import { WelcomeService } from './welcome.service';

@Component({
    moduleId: module.id,
    selector: "welcome",
    templateUrl: "welcome.component.html",
    styleUrls: ["welcome.component.css"]
})

export class WelcomeComponent {
    constructor() {
    }

}