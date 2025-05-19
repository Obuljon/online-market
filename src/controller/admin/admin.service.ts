import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../../schema/admin.schema';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async access_token({ email, _id }): Promise<{ access_token: string }> {
    const payload = { _id, email, role: 'ADMIN' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createAdmin({ name, email, password }): Promise<any> {
    const hashedPassword = await hash(password, 10);
    const newAdmin = new this.adminModel({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newAdmin.save();
  }

  async updateAdmin(id: string, updateData): Promise<any | null> {
    const { password } = updateData;
    const hashedPassword = password ? await hash(password, 10) : undefined;
    return this.adminModel
      .findByIdAndUpdate(
        id,
        { ...updateData, password: hashedPassword, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }

  deleteAdmin(id: string): Promise<any | null> {
    return this.adminModel.findByIdAndDelete(id).exec();
  }

  findAdminByEmail(email: string): Promise<any | null> {
    return this.adminModel.findOne({ email }).exec();
  }

  findAdminById(id: string): Promise<Admin | null> {
    return this.adminModel.findById(id).exec();
  }

  getUserCount(): Promise<number> {
    return this.adminModel.countDocuments();
  }
}
