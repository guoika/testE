import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token');
        let request;
        if (!localStorage.getItem('watting') || req.method !== 'POST' ) {
          request = req.clone({
            url: `${req.url}`,
            setHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
          });
        }
        localStorage.setItem('watting', 'yes');
        setTimeout(() => {
          localStorage.removeItem('watting');
        }, 500);
        return next.handle(request).pipe();
    }
}
