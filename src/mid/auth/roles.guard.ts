import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true; // agar route rollarsiz bo'lsa, ruxsat beriladi
        }
        const { person } = context.switchToHttp().getRequest();
        if (!person || !requiredRoles.includes(person.roles[0])) {
            throw new ForbiddenException('Sizda ushbu sahifaga kirish huquqi yo‘q');
        }

        return true;
    }
}