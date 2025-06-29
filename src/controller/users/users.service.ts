import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schema/user.schema';
import { SignupUserDTO, UserType } from '../dtos/userDTO';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async addUser({ name, email, password }): Promise<User> {
    const hashedPassword = await hash(password, 10); // TODO: Hash the password before saving
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newUser.save();
  }

  async access_token({ email, _id }): Promise<{ access_token: string }> {
    const payload = { _id, email, role: 'USER' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findUserByEmail(email: string): Promise<UserType | null> {
    try {
      const user = await this.userModel.findOne({ email }).lean();
      if (!user) return null;
      return {
        ...user,
        _id: user._id.toString(),
      } as UserType;
    } catch (error) {
      return null;
    }
  }
}
