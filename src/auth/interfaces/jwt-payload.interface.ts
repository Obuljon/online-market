import { UserRole } from "src/users/entities/users.entity";

export interface JwtPayload {
    sub: string; // user id
    role: UserRole;
    fullName: string;
}
export interface JwtPayloadWithRefresh extends JwtPayload {
    refreshToken: string;
}