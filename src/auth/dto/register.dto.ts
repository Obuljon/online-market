import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({ example: 'Doniyor Qalandarov' })
    fullName: string;

    @ApiProperty({ example: 'email@gmail.com' })
    email: string;

    @ApiProperty({ example: 'password123' })
    password: string;
}