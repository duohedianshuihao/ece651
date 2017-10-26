import { Component, OnInit } from '@angular/core';
import { jobinfoForm } from "../Models/jobinfoForm";
import { JobinfoService } from "./jobinfo.service";

@Component({
    selector: 'jobinfo',
    templateUrl: './app/jobinfo/jobinfo.component.html'
})

export class JobinfoComponent {
    constructor (
        private jobinfoService : JobinfoService
    ) {}

    form = new jobinfoForm("WCNM", "", new Date(), new Date(), "", "");

    get(form: jobinfoForm) {
        this.jobinfoService
            .login(form)
            .subscribe();
    }

    clear() {
        this.form.jobTitle = "";
        this.form.jobDescription = "";
        this.form.startTime = new Date();
        this.form.expirTime = new Date();
        this.form.location = "";
        this.form.comment = "";
    }


}