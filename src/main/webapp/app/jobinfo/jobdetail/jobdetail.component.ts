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
    @Input() public jobId: string;
    @Input() public jobTitle: string;
    @Input() public jobDescription: string;
    @Input() public company: string;
    @Input() public requiredSkills: Array<string>;
    @Input() public createdTime: Date;
    @Input() public startTime: Date;
    @Input() public expirTime: Date;
    @Input() public location: string;
    @Input() public categories: string;
    @Input() public comments: Comment;
    @Input() jobdetail: jobDetails;
    constructor (
        private jobinfoService: JobinfoService,
    ) {}

    ngOnInit() {

    }
}