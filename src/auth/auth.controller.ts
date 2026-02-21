import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './interfaces/auth-response';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
}
