import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private httpClient: HttpClient) {

    }

    book(criteria: any) {
        const url = 'http://localhost:8888/locations/'
        this.httpClient.post(url, criteria);
    }

}
