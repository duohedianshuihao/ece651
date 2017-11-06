import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';
import { Observable }    from 'rxjs/Observable';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';


@Injectable()

export class NavbarService {
    constructor(private router: Router,
                private http: Http,
                ) {}

    // searchJob(searchWords) {
    //     let searchUrl = "/searchEngine";
    //     let urlSearchParams = new URLSearchParams();
    //     urlSearchParams.set("content", searchWords);
    //     this.http.get(searchUrl, urlSearchParams)
    // }
}


// let params: URLSearchParams = new URLSearchParams();
//  params.set('appid', StaticSettings.API_KEY);
//  params.set('cnt', days.toString());

//  //Http request-
//  return this.http.get(StaticSettings.BASE_URL, {
//    search: params
//  }).subscribe(
//    (response) => this.onGetForecastResult(response.json()),
//    (error) => this.onGetForecastError(error.json()),
//    () => this.onGetForecastComplete()
//  );
