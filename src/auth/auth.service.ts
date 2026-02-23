import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interfaces/auth-response';
import { User } from 'src/users/entities/users.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
    // logger: any;
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService
    ) { }

    async register(registerDto: RegisterDto): Promise<AuthResponse> {
        console.log(registerDto);

        try {
            const findUser = await this.usersService.findByEmail(registerDto.email);
            if (findUser) {
                throw new ConflictException("this email already registered");
            }
            const hashedPassword = await this.hashPassword(registerDto.password);

            const user = await this.usersService.createUser({
                ...registerDto,
                password: hashedPassword,
            });
            const tokens = await this.generateToken(user);
            return {
                user,
                ...tokens
            };
        } catch (error) {
            console.error('Registration failed', error);
            // this.logger.error('Registration failed', error.stack);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Registration failed: ' + error.message);
        }
    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        try {
            const user = await this.usersService.findByEmail(loginDto.email);
            if (!user) {
                throw new NotFoundException("User not found");
            }
            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                throw new HttpException("Invalid credentials", 401);
            }
            const tokens = await this.generateToken(user);
            return {
                user,
                ...tokens
            };
        } catch (error) {
            console.error('Login failed', error);
            // this.logger.error('Login failed', error.stack);
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Login failed: ' + error.message);
        }

    }

    async generateToken(user: User): Promise<{ accessToken: string, refreshToken: string }> {
        const payload: JwtPayload = {
            sub: user.id,
            role: user.role,
            fullName: user.fullName,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: '15m' }),
            this.jwtService.signAsync(payload, { expiresIn: '7d' }),

        ]);
        return { accessToken, refreshToken }
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<{ message: string }> {
        const user = await this.usersService.findByEmail(verifyEmailDto.email);
        if (!user) {
            throw new NotFoundException("user not found");

        }
        const { isVerified } = await this.usersService.isVerified(user.id);
        if (isVerified) {
            return { message: "Email already verified" };
        }
        if (user.verificationCode !== verifyEmailDto.code) {
            throw new BadRequestException("Invalid verification code");
        }
        await this.usersService.updateUser(user.id, { isEmailVerified: true, verificationCode: null });
        return { message: "Email verified successfully" };
    }

    async forgotPassword(email: string): Promise<{ message: string }> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException("user not found");
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        await this.usersService.updateUser(user.id, { resetPasswordCode: code });
        await this.mailService.sendResetPasswordEmail(user.email, code);
        return { message: "Reset password code sent to email" };
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
        const user = await this.usersService.findByEmail(resetPasswordDto.email);
        if (!user) {
            throw new NotFoundException("user not found");
        }
        if (user.resetPasswordCode !== resetPasswordDto.code) {
            throw new BadRequestException("Invalid reset password code");
        }
        const hashedPassword = await this.hashPassword(resetPasswordDto.newPassword);
        await this.usersService.updateUser(user.id, { password: hashedPassword, resetPasswordCode: null });
        return { message: "Password reset successfully" };
    }
}
