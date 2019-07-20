import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor (public storage: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;
        let requestToApi = req.url.substring(0, N) == API_CONFIG.baseUrl;

        if (localUser && requestToApi) {
            console.log("01");
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer '+ localUser.token)});
            return next.handle(authReq);
        } else {
            console.log("02");
            return next.handle(req);
        }
        
        
    }
}

export const AuthInterceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}];