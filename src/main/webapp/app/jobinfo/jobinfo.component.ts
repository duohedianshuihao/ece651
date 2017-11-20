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
    public inJobInfo: boolean = true;

    // public totalPages: number;
    // public curPage: number;
    // public pageContent: Array<[any]>;
    // public arrIndex: number[] = [];

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
              // this.totalPages = Math.ceil(this.jobModels.length / 6);
              // for (var i = 0; i < this.totalPages; ++i) {
              //     this.arrIndex.push(i + 1);
              // };
          }, error => {
              console.log(error);
          });

      // this.jobinfoService.getNumberOfJobs().subscribe(numberOfJob => {
      //       this.numberOfJobs = numberOfJob;
      //   });
      this.jobinfoService.getNumberOfUsers().subscribe(numberOfUser => {
          this.numberOfUsers = numberOfUser;
      });
    }

    searchJob(jobs) {
      this.jobModels = jobs;
    }


}
