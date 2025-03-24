import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({ example: 'your_jwt_token_here', description: 'JWT access token' })
  access_token: string;
}

export class RegisterResponse {
  @ApiProperty({ example: 'User registered successfully', description: 'Confirmation message' })
  message: string;
}

export class ConflictResponse {
  @ApiProperty({ example: 'Username or email already exists', description: 'Error message for duplicate registration' })
  message: string;

  @ApiProperty({ example: 'Conflict', description: 'Error type' })
  error: string;

  @ApiProperty({ example: 409, description: 'HTTP status code' })
  statusCode: number;
}
