import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable} from 'rxjs';

// import {AuthService, TOKEN_KEY} from "../Services/authentification.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // constructor(private authService: AuthService) {
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // const token = this.authService.getToken();
        const token = "";
        if (token) {
            const cloned = req.clone(
                {
                    setHeaders: {
                        'Authorization': `${token}`
                    }
                }
            )
            return next.handle(cloned);
        }
        return next.handle(req);
    }

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}
