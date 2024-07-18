import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = localStorage.getItem('access_token');

    const authReq = request.clone({
        setHeaders: {
          'authorization': `Bearer ${authToken}`
        }
      });
    

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
       
        console.error('error occurred:', error);
        if(error.status === 401){
          localStorage.removeItem('pmtuserId');
          localStorage.removeItem('pmtuserType');
          this.router.navigate(['/']);
        }
       
        return throwError(error);
      })
    );
  }
}
