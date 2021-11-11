import { User } from "../model/user";
import * as AuthActions from "./auth.actions";

export interface State {
    user: User,
    authError: string,
    loading: boolean
}

const initState: State = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(state: State = initState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user = new User(action.payload.email, action.payload.id, action.payload.token, action.payload.expirationDate);
            return {...state, user: user, authError: null, loading: false};
        case AuthActions.LOGOUT:
            return {...state, user: null};
        case AuthActions.CLEAR_ERROR: 
        return {...state, authError: null};
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {...state, authError: null, loading: true};
        case AuthActions.AUTHENTICATE_FAIL: 
            return {...state, authError: action.payload, loading: false};
        default:
            return state;
    }
}