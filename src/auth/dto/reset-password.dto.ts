import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, MinLength } from "class-validator";

// auth/dto/reset-password.dto.ts
export class ResetPasswordDto {
    @ApiProperty({ example: 'user@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @Length(6, 6)
    code: string;

    @ApiProperty({ example: 'newPassword123' })
    @IsString()
    @MinLength(6)
    newPassword: string;
}