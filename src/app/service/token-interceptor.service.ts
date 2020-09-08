import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (JSON.parse(localStorage.getItem('userData'))) {
            const modifyRequest = request.clone({
                headers: request.headers.append('Authorization', `Bearer` + JSON.parse(localStorage.getItem('userData')).token)
            })
            return next.handle(modifyRequest);
        }
        else {
            return next.handle(request);
        }

    }
}