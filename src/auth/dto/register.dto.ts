import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'newuser', description: 'New username for registration' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'SecurePass123', description: 'Secure password for the user' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email address for the user' })
  @IsEmail()
  email: string;
}
