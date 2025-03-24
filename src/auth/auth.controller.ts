import {
  Controller,
  Post,
  Body,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthResponse, ConflictResponse, RegisterResponse } from './dto/auth.response';

@ApiTags('Auth') // ✅ Swagger group
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
    type: AuthResponse,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() body: LoginDto) {
    this.logger.log(`Login attempt for user: ${body.username}`);

    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (!user) {
      this.logger.warn(`Login failed for user: ${body.username}`);
      throw new UnauthorizedException('Invalid credentials'); // returns 401 Unauthorized
    }

    this.logger.log(`User ${body.username} logged in successfully`);
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: RegisterResponse,
  })
  @ApiResponse({
    status: 409,
    description: 'Username or email already exists',
    type: ConflictResponse,
  })
  async register(@Body() registerDto: RegisterDto) {
    const { username, password, email } = registerDto;
    return this.authService.register(username, password, email);
  }
}
