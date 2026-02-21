export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        fullName: string;
        email: string;
        role: string;
    }
}