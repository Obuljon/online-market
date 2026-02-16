import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../../schema/admin.schema';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminDTO, EditAdminDTO } from '../dtos/adminDTO';

export enum ROLE {
  ADMIN = 'ADMIN',
}

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
  ) { }

  async generateAccessToken(admin: Admin): Promise<{ access_token: string }> {
    const payload = { email: admin.email, role: ROLE.ADMIN };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createAdmin(adminDto: AdminDTO): Promise<{ message: string } | Admin> {
    const existingAdmin = await this.adminModel.findOne({ email: adminDto.email });
    if (existingAdmin) {
      throw new ConflictException("admin allaqachon mavjud");
    }
    const hashedPassword = await hash(adminDto.password, 10);
    const admin = new this.adminModel({ ...adminDto, password: hashedPassword, role: ROLE.ADMIN });
    return admin.save();
  }

  async updateAdmin(id: string, editAdmin: EditAdminDTO): Promise<{ message: string }> {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException("admin topilmadi");
    }
    if (editAdmin.password) {
      editAdmin.password = await hash(editAdmin.password, 10);
    }
    await this.adminModel.findByIdAndUpdate(id, editAdmin);
    return { message: 'Admin yangilandi' };
  }

  async deleteAdmin(id: string): Promise<{ message: string }> {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException("admin topilmadi");
    }
    await this.adminModel.findByIdAndDelete(id);
    return { message: 'Admin o\'chirildi' };
  }

  async findAdminByEmail(email: string): Promise<{ admin: Admin }> {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) {
      throw new NotFoundException("admin topilmadi");
    }
    return { admin: admin }
  }

  findAdminById(id: string): Promise<Admin | null> {
    return this.adminModel.findById(id).exec();
  }

  getUserCount(): Promise<number> {
    return this.adminModel.countDocuments();
  }
}
