import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

// verified.guard.ts
@Injectable()
export class IsVerifiedGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.user.sub; // JWT'dan keladi

        const { isVerified } = await this.usersService.isVerified(userId);

        if (!isVerified) {
            throw new ForbiddenException('Email is not verified');
        }
        return true;
    }
}