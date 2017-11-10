import {jobDetails} from "../../Models/jobDetails";
import { Injectable, EventEmitter, } from '@angular/core';


@Injectable()

export class JoblistsService {
    public jobdata: jobDetails = null;

}