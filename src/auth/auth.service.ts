import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { ConflictException } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>, // Inject User model
  ) {}

  // Create a logger instance
  private readonly logger = new Logger(AuthService.name); 

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.debug(`Validating user: ${username}`);

    // Query the database for the user
    const user = await this.userModel.findOne({ username }).exec();

    if (user && bcrypt.compareSync(password, user.password)) {
      this.logger.debug(`User ${username} validated successfully`);
      return { id: user.id, username: user.username }; 
    }

    this.logger.warn(`Invalid credentials for user: ${username}`);
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string, email: string) {
     // Check if a user with the same username or email already exists
    const existingUser = await this.userModel.findOne({
      $or: [{ username }, { email }],
    }).exec();

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user in the database
    const newUser = new this.userModel({ username, password: hashedPassword, email });
    await newUser.save();

    return { message: 'User registered successfully' };
  }
}
