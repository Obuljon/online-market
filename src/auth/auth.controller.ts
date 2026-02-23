import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interfaces/auth-response';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  @ApiOperation({ summary: 'User login and get JWT token' })
  @ApiResponse({ status: 201, description: 'Register successful, returns token.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    console.log(registerDto);
    return this.authService.register(registerDto)
  }

  @Post('/login')
  @ApiOperation({ summary: 'User login and get JWT token' })
  @ApiResponse({ status: 201, description: 'Login successful, returns token.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() loginDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.login(loginDto)
  }

  @Post('/verify-email')
  @ApiOperation({ summary: 'Verify user email with code' })
  @ApiResponse({ status: 200, description: 'Email verified successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid verification code.' })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('/reset-password')
  @ApiOperation({ summary: 'Reset user password with code' })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid reset code.' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('/forgot-password')
  @ApiOperation({ summary: 'Send reset password code to email' })
  @ApiResponse({ status: 200, description: 'Reset password code sent to email.' })
  @ApiResponse({ status: 400, description: 'Invalid email address.' })
  async forgotPassword(@Param('email') email: string) {
    return this.authService.forgotPassword(email);
  }
}
