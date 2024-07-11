export type UserState = {
    role: string,
    data: Record<string, string> | undefined,
    token: string,
    isLoggedIn: boolean
}