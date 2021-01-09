import { Injectable } from '@angular/core';
import{HttpHandler, HttpEvent, HttpResponse, HttpRequest, HttpErrorResponse, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { switchMap, filter, take, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
      const token:String = localStorage.getItem('token');
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

        return next.handle(req).pipe(
              catchError( (error:HttpErrorResponse)=>{
                      if(error.status==401){
                        console.log("401 Unauthorized User");
                      }
                      const err = error.error.message || error.statusText;
                      return throwError(error);    
              })
        );

         
    
  }



}
