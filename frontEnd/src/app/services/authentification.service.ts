import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Credentials} from "../../../types";
import {Router} from "@angular/router";


export const TOKEN_KEY = 'auth-token';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    public user: Subject<string> = new BehaviorSubject<string>("");

    constructor(private http: HttpClient, private router: Router) {
    }

    getUser() {
        return this.user;
    }

    connect(data: string) {
        this.user.next(data);
    }

    disconnect() {
        this.user.next("");
    }

    verification(credentials: Credentials): Observable<any> {
        return this.http.post('http://localhost:8888/users/login',
            JSON.stringify(credentials), httpOptions);
    }

    saveToken(token: any) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    }



    public isTokenExpired() {
        let token = <string>this.getToken();
        if (token) {
            const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
            return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        }
        return false
    }

    getToken() {
        let token = window.localStorage.getItem(TOKEN_KEY);
        return token ? JSON.parse(token).access_token : null;
    }

    signOut() {
        window.localStorage.removeItem(TOKEN_KEY);
        this.router.navigateByUrl("/properties");
    }
    isLoggedIn() {
        return this.getToken() === null;
    }
}
