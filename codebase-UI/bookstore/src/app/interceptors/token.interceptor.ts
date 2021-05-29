import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService : AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userInfo().pipe(take(1), exhaustMap(user => {

      let userData = JSON.parse(localStorage.getItem('userData') || '{}')
      console.log("http interceptor : ", userData)
      // This will add token to all the out going request including signup, signin at that time token in empty
      // to avoid this issue, we can check token and append if it is available

      if(!(Object.keys(userData).length > 0)){
        return next.handle(request);
      }
      
      // add token otherwise
      const modifiedRequest = request.clone({
        headers: request.headers.append('Authorization' , 'Bearer ' + userData.token.access)
      });

      return next.handle(modifiedRequest).pipe(tap(event => {
        if(event.type === HttpEventType.Response){
          // console.log("Response arrived : ", event.body);
        }
      }));
    }))
  }
}
