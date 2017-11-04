import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { UserService } from './user.service';
import { userProfile } from '../Models/userProfile';

@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: "user.component.html",
    styleUrls: ["user.component.css"]
})

export class UserComponent implements OnInit {
    currentUser: any;
    public user: userProfile;
    public dataLoaded: boolean;
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.dataLoaded = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(){
        this.userService.getUser(this.currentUser.userName)
                        .subscribe(
                            user => {
                                this.user = user;
                                this.dataLoaded = true;
                            });
    }
}