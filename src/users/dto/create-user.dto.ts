import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { UserRole } from "../entities/users.entity";

export class CreateUserDto {
    @ApiProperty({ example: 'user1', description: 'Username' })
    @IsString()
    readonly fullName: string;

    @ApiProperty({ example: 'password123', description: 'Password' })
    @IsString()
    readonly password: string;

    @ApiProperty({ example: 'doniyorqalandarov853@gmail.com', description: 'Email address' })
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: 'Role of the user', enum: UserRole, default: UserRole.BUYER })
    @IsString()
    @IsOptional()
    role?: UserRole;
}