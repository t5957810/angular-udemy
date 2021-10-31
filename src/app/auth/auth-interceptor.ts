import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user$.pipe(
      take(1),
      exhaustMap(user => {
        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
