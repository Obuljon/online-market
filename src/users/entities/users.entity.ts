
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
export enum UserRole {
    ADMIN = 'admin',             // Administrator
    SELLER = 'sotuvchi',         // Mahsulot qo‘shadi va boshqaradi
    BUYER = 'xaridor',           // Mahsulot ko‘radi, buyurtma beradi
    COURIER = 'kuryer',          // Buyurtmalarni yetkazadi
    WAREHOUSE = 'omborchi',      // Ombor operatori
    SUPPORT = 'yordamchi'        // Mijoz va sotuvchi muammolarini hal qiladi
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.BUYER })
    role: UserRole;

    @Column({ unique: true, nullable: true })
    phoneNumber?: string

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isEmailVerified: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
