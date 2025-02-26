import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'newuser', description: 'New username for registration' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'SecurePass123', description: 'Secure password for the user' })
  @IsString()
  @MinLength(6)
  password: string;
}
