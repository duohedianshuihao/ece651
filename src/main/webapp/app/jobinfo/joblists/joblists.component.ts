import { Component, Input } from '@angular/core';
import { JobinfoService } from '../jobinfo.service';
import { JobDetails } from '../../Models/jobDetails';

@Component({
    moduleId: module.id,
    selector: 'joblists',
    templateUrl: 'joblists.component.html',
    styleUrls: ['joblists.component.css']

})

export class JoblistsComponent {
    @Input() jobModels: JobDetails[] = [];
    constructor (
        private jobinfoService: JobinfoService
    ) {}
}
