import * as fromApp from './../store/app.reducer';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return this.authService.user$.pipe(
      return this.store.select('auth').pipe(   
        take(1), // 只在進入guard時檢查一次即可，自動 unsubscribe
        map(authState => authState.user),
        map((user) => {
          const isAuth = !!user;
          if(isAuth) {
            return true;
          } else {
            return this.router.createUrlTree(['/auth']);
          }
        })
      )
  }
}
