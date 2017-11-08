import { Component, Input, OnInit } from '@angular/core';
import { JobinfoService } from '../jobinfo.service';
import { jobDetails } from '../../Models/jobDetails';

@Component({
    moduleId: module.id,
    selector: 'jobdetail',
    templateUrl: 'jobdetail.component.html',
    styleUrls: ['jobdetail.component.css']

})

export class JobdetailComponent implements OnInit{
    @Input() jobdetail: jobDetails;
    constructor (
        private jobinfoService: JobinfoService,
    ) {}

    ngOnInit() {

    }
}