export type UserState = {
    role: string,
    data: Record<string, string>,
    token: string,
    isLoggedIn: boolean
}