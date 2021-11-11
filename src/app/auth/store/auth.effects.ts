import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../model/auth-response-data";
import * as AuthActions from "./auth.actions";
import { SignupError } from '../model/signup-error.enum';
import { SigninError } from '../model/signin-error.enum';
import { User } from '../model/user';


const handleAuthentication = (responseData: AuthResponseData) => {
    const expirationDate = new Date(new Date().getTime() + (+responseData.expiresIn) * 1000);
    const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));

    return new AuthActions.AuthenticateSuccess({
        email: responseData.email,
        id: responseData.localId,
        token: responseData.idToken,
        expirationDate: expirationDate
    }); //建立新的Observable 避免掛掉，
};

const handleError = (errorResponse) => {
    if (!errorResponse.error || !errorResponse.error.error) {
        return of(new AuthActions.AuthenticateFail('unknow error occur'));
    }

    let errorMessage = '';
    switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = SignupError.EMAIL_EXISTS;
            break;
        case 'OPERATION_NOT_ALLOWED':
            errorMessage = SignupError.OPERATION_NOT_ALLOWED;
            break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = SignupError.TOO_MANY_ATTEMPTS_TRY_LATER;
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = SigninError.EMAIL_NOT_FOUND;
            break;
        case 'INVALID_PASSWORD':
            errorMessage = SigninError.INVALID_PASSWORD;
            break;
        case 'USER_DISABLED':
            errorMessage = SigninError.USER_DISABLED;
            break;
    }

    if (errorResponse.error.error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
        errorMessage = SigninError.TOO_MANY_ATTEMPTS_TRY_LATER;
    }
    return of(new AuthActions.AuthenticateFail(errorMessage)); //建立新的Observable 避免掛掉
};

@Injectable()
export class AuthEffects {
    newHttpClient = new HttpClient(this.httpBackend);

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((authData: AuthActions.SignupStart) => {
            return this.newHttpClient.post<AuthResponseData>(environment.firebaseRestUrl + 'accounts:signUp?key=' + environment.firebaseApiKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }).pipe(
                    map((responseData: AuthResponseData) => {
                        return handleAuthentication(responseData);
                    }), catchError(errorResponse => {
                        return handleError(errorResponse);
                    })
                );
        })
    );

    // effect裡的Observable 不可以掛掉，故要在裡面的Observable處理error 而不是外面
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.newHttpClient.post<AuthResponseData>(environment.firebaseRestUrl + 'accounts:signInWithPassword?key=' + environment.firebaseApiKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                })
                .pipe(
                    tap((responseData: AuthResponseData) => {
                        this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
                    }),
                    map((responseData: AuthResponseData) => {
                        return handleAuthentication(responseData);
                    }), catchError(errorResponse => {
                        return handleError(errorResponse);
                    })
                )
        })
    );

    @Effect({
        dispatch: false
    })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    @Effect({
        dispatch: false
    })
    autoLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return { type: 'no userData' };
            }

            const loadUser = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate);
            if (loadUser.token) {
                const newExpirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(newExpirationDuration);
                 return new AuthActions.AuthenticateSuccess({
                    email: loadUser.email,
                    id: loadUser.id,
                    token: loadUser.token,
                    expirationDate: userData._tokenExpirationDate
                });
            }
            return { type: '' };
        })
    );


    constructor(
        private actions$: Actions,
        private httpBackend: HttpBackend,
        private router: Router,
        private authService: AuthService
    ) {

    }

}