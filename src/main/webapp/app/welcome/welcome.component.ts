import { Component, Input } from "@angular/core";
import { userProfile } from '../Models/userProfile';
import { WelcomeService } from './welcome.service';

@Component({
    moduleId: module.id,
    selector: "welcome",
    templateUrl: "welcome.component.html",
})

export class WelcomeComponent {
    constructor() {
    }

}