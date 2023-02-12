/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProviders {
    //url backend api json
    server = 'http://localhost/Plantastic/login/';

    constructor(
        public http: HttpClient
    ) { }

    postData(body, file) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset = UTF-8'
        });

        const options = {
            headers
        };

        return this.http.post(this.server + file, JSON.stringify(body), options);
            // .timeout(59000) //59 seconds timeout
            // .map(res => res);
    }
}
