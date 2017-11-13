import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';
import { Observable }    from 'rxjs/Observable';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';


@Injectable()

export class NavbarService {
    constructor(private router: Router,
                private http: Http,
                ) {}

    search(word) {
        let searchUrl = "/searchEngine";
        let params: URLSearchParams = new URLSearchParams();
        params.set("content", word);
        return this.http
                   .get(searchUrl, {search: params})
                   .map((response: Response) => response.json());
    }
}
