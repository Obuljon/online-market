// src/database/seeds/admin.seed.ts
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from 'src/users/entities/users.entity';

export async function seedAdmin(dataSource: DataSource) {
    const userRepo = dataSource.getRepository(User);

    // Avval tekshiradi — bor-yo'qligini
    const exists = await userRepo.findOne({
        where: { role: UserRole.ADMIN }
    });

    // Bor bo'lsa — hech narsa qilmaydi
    if (exists) {
        console.log('✅ Admin allaqachon mavjud, skip');
        return;
    }

    // Yo'q bo'lsa — yaratadi
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10);

    await userRepo.save(
        userRepo.create({
            fullName: 'superadmin',
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: UserRole.ADMIN,
            isActive: true,
            // isEmailVerified: true,
            phoneNumber: process.env.ADMIN_PHONE,
            isEmailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    );

    console.log('✅ Admin muvaffaqiyatli yaratildi');
}