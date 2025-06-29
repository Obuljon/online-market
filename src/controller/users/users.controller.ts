import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDTO, SignupUserDTO, UserType } from '../dtos/userDTO';
import { compare } from 'bcrypt';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: SignupUserDTO) {
    const { email, password, name } = body;
    const isUserExist = await this.usersService.findUserByEmail(email);
    if (isUserExist) {
      throw new BadRequestException('bunday accaunt mavjud!');
    }

    return this.usersService.addUser({
      name,
      email,
      password,
    });
  }

  @Post('login')
  async login(@Body() body: LoginUserDTO) {
    const { email, password } = body;
    const isUserExist = await this.usersService.findUserByEmail(email);
    if (!isUserExist) {
      throw new BadRequestException('bunday accaunt mavjud emas!');
    }
    const isPasswordCorrect = await compare(password, isUserExist['password']);

    if (!isPasswordCorrect) {
      throw new BadRequestException('parol xato!');
    }
    return this.usersService.access_token({
      email: isUserExist['email'],
      _id: isUserExist['_id'],
    });
  }
}
