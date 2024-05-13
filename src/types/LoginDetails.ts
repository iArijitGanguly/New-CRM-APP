export type LoginDetails = {
    message: string,
    token: string,
    userData: {
        _id: string,
        email: string,
        name: string,
        userType: string,
        userStatus: string,
        clientName: string,
        createdAt: string,
        updatedAt: string
    }
};