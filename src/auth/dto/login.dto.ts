import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'newuser', description: 'Username for login' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'SecurePass123', description: 'Password for login' })
  @IsString()
  @MinLength(6)
  password: string;
}