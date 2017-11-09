import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobinfoService } from './jobinfo.service';
import { NavbarService } from "../navbar/navbar.service";

import { jobDetails } from '../Models/jobDetails';

@Component({
    moduleId: module.id,
    selector: 'jobinfo',
    templateUrl: 'jobinfo.component.html',
    styleUrls: ['jobinfo.component.css']
})

export class JobinfoComponent implements OnInit{
    public jobModels: jobDetails[] = [];
    public numberOfJobs: number;
    public numberOfUsers: number;

    constructor (
        private jobinfoService: JobinfoService,
        private navbarService: NavbarService,
        private router: Router
        ) {}

    ngOnInit () {
      this.jobinfoService
          .getJobDetails()
          .subscribe(jobModels => {
              this.jobModels = jobModels;
          }, error => {
              console.log(error);
          });

      this.jobinfoService.getNumberOfJobs().subscribe(numberOfJob => {
            this.numberOfJobs = numberOfJob;
        });
      this.jobinfoService.getNumberOfUsers().subscribe(numberOfUser => {
          this.numberOfUsers = numberOfUser;
      });
    }

    searchJob(jobs) {
      console.log(jobs);
      this.jobModels = jobs;
    }
}
