import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';  
import { JwtStrategy } from './jwt.strategy';  
import { User, UserSchema } from '../users/entities/user.entity';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User schema
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [AuthService, JwtStrategy],  // ✅ Provide JwtStrategy if using passport
  controllers: [AuthController],
  exports: [AuthService],  // ✅ Export AuthService if used in other modules
})
export class AuthModule {}
