import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({ example: 'your_jwt_token_here', description: 'JWT access token' })
  access_token: string;
}

export class RegisterResponse {
  @ApiProperty({ example: 'User registered successfully', description: 'Confirmation message' })
  message: string;
}
