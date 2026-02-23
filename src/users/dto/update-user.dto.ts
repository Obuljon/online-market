// update-user.dto.ts
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsBoolean()
    isEmailVerified?: boolean;

    @IsOptional()
    @IsString()
    verificationCode?: string | null;

    @IsOptional()
    @IsString()
    resetPasswordCode?: string | null;
}