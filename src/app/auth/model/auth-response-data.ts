export interface AuthResponseData {
    displayName?: string,
    kind: string
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string,
    registered?: boolean
}
