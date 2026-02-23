import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>,
        private readonly mailService: MailService) {
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const findUser = await this.userRepo.findOne({ where: { email: createUserDto.email } });
        if (findUser) {
            throw new ConflictException('User with this email already exists');
        }
        const user = this.userRepo.create(createUserDto);

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = code;
        await this.mailService.sendVerificationEmail(user.email, code);
        return this.userRepo.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { email } });
    }

    async getOneUser(id: string): Promise<User> {
        const findUser = await this.userRepo.findOne({ where: { id } })
        if (!findUser) {
            throw new NotFoundException("user not found");
        }
        return findUser;
    }
    async getAllUsers(): Promise<User[]> {
        return this.userRepo.find();
    }
    async updateUser(id: string, updateData: UpdateUserDto): Promise<{ message: string }> {
        const findUser = await this.userRepo.findOne({ where: { id } })
        if (!findUser) {
            throw new NotFoundException("user not found");
        }
        Object.assign(findUser, updateData);
        await this.userRepo.save(findUser);
        return { message: 'success update ' }
    }
    async isVerified(id: string): Promise<{ isVerified: boolean }> {
        const findUser = await this.userRepo.findOne({ where: { id } })
        if (!findUser) {
            throw new NotFoundException("user not found");
        }
        return { isVerified: findUser.isEmailVerified }
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        const findUser = await this.userRepo.findOne({ where: { id } })
        if (!findUser) {
            throw new NotFoundException("user not found");
        }
        await this.userRepo.remove(findUser);
        return { message: 'success delete' }
    }
}