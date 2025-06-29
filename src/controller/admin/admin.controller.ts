import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDTO, EditAdminDTO } from '../dtos/adminDTO';
import { compare } from 'bcrypt';
import { AuthGuard } from 'src/mid/auth/auth.guard';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminservice: AdminService) {}

  @Post('add')
  @UseGuards(AuthGuard)
  async addAdmin(@Body() body: AdminDTO) {
    const { email } = body;
    // 1. Adminni topish
    const admin = await this.adminservice.findAdminByEmail(email);
    if (admin) {
      // 2. Admin topilsa
      throw new BadRequestException('Admin allaqachon mavjud');
    }
    // 3. Adminni yaratish
    const newAdmin = await this.adminservice.createAdmin(body);
    if (!newAdmin) {
      // 4. Admin yaratilmadi
      throw new BadRequestException('Admin yaratilmadi');
    }
    // 5. Admin yaratildi
    return {
      message: 'Admin yaratildi',
      data: newAdmin,
    };
  }

  @Post('login')
  async loginAdmin(@Body() body: AdminDTO) {
    const { email, password } = body;

    // 1. Adminni topish
    const admin = await this.adminservice.findAdminByEmail(email);

    // 2. Admin topilmasa
    if (!admin) {
      const countDocuments = await this.adminservice.getUserCount();

      // 3. Baza bo'sh bo'lsa - birinchi adminni yaratamiz
      if (countDocuments === 0) {
        const defaultAdmin = process.env.DEFOULT_ADMIN;
        console.log('isMatch');

        const newAdmin = await this.adminservice.createAdmin({
          name: defaultAdmin,
          email: `${defaultAdmin}@email.com`,
          password: defaultAdmin,
        });

        // Faqat bodydagi ma'lumotlar default admin bilan mos bo'lsa token beramiz
        const isMatch =
          email === newAdmin.email &&
          (await compare(password, newAdmin.password));
        if (isMatch) {
          const { email, _id } = newAdmin;
          return this.adminservice.access_token({ email, _id });
        } else {
          // Agar mos bo'lmasa — noto'g'ri ma'lumotlar
          throw new BadRequestException(
            'Avvalgi tizimga kirish maʼlumotlari notoʻgʻri!',
          );
        }
      } else {
        throw new NotFoundException('Admin maʼlumotlari topilmadi');
      }
    }

    // 4. Admin topilgan — parolni tekshirish
    const isMatch = await compare(password, admin.password);
    if (!isMatch) {
      throw new BadRequestException('maʼlumotlar notoʻgʻri');
    }

    // 5. Token yaratish va yuborish
    return this.adminservice.access_token({ email, _id: admin._id });
  }

  @Get('mydata')
  @UseGuards(AuthGuard)
  async getMyData(@Req() req: Request) {
    const { _id } = req['person'];
    return this.adminservice.findAdminById(_id);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  async updateAdmin(@Body() body: EditAdminDTO, @Req() req: Request) {
    const { _id } = req['person'];
    const { email } = body;
    // 1. Adminni topish
    const admin = await this.adminservice.findAdminByEmail(email);
    if (admin) {
      throw new BadRequestException('Admin allaqachon mavjud');
    }
    // 2. Adminni yangilash
    return this.adminservice.updateAdmin(_id, body);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  async deleteAdmin(@Req() req: Request) {
    const { _id } = req['person'];
    const admin = await this.adminservice.deleteAdmin(_id);

    if (!admin) {
      throw new NotFoundException('Admin maʼlumotlari topilmadi');
    }
    return {
      message: "Admin o'chirildi",
      data: admin,
    };
  }
}
