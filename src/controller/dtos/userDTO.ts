import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class SignupUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @Length(10, 100, { message: 'email must be between 10 and 100 characters' })
  email: string;

  @IsNotEmpty()
  // @IsStrongPassword()
  @Length(8, 100, { message: 'password must be between 8 and 100 characters' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 100, { message: 'name must be between 5 and 100 characters' })
  name: string;
}

export class LoginUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export interface UserType {
  _id: string | ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
