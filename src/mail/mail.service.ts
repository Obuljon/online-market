import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendVerificationEmail(email: string, code: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Sizning tasdiqlash kodingiz',
            text: `Sizning tasdiqlash kodingiz: ${code}`,
            html: `<strong>Sizning tasdiqlash kodingiz: ${code}</strong>`,

        });
    }

    // mail.service.ts
    async sendResetPasswordEmail(email: string, code: string): Promise<void> {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Reset Password',
            text: `Your reset password code: ${code}`,
        });
    }
}
