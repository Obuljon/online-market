import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class AdminDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  password: string;
}

export class EditAdminDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsOptional()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;
}