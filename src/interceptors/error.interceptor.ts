import { StorageService } from './../services/storage.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor (
        public storage: StorageService,
        public alertCtl: AlertController
        ) {

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) =>{
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            switch (errorObj.status) {
                case 401:
                    this.handle401();
                break;

                case 403: 
                    this.handle403();
                break;

                default:
                    this.handleDefault(errorObj);
            }
            console.log("Error detectado pelo interceptor: "+errorObj);
            return Observable.throw(error); 
        }) as any;
    }

    handle403 () {
        this.storage.setLocalUser(null);
    }

    handle401 () {
        let alert = this.alertCtl.create({
            title: "Error 401: falha de autenticação",
            message: "Login ou senha incorretos",
            enableBackdropDismiss: false,
            buttons: [{
                text: "Ok"
            }]

        });

        alert.present();
    }

    handleDefault(errorObj) {
        let alert = this.alertCtl.create({
            title: `Error ${errorObj.status}: ${errorObj.error}`,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [{
                text: "OK"
            }]
        });

        alert.present();
    }
}

export const ErrorInterceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
}];