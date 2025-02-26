import { Injectable, Logger } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  // Create a logger instance
  private readonly logger = new Logger(AuthService.name); 

  // TODO: Storing the list of users in memory, will move to a Database later
  private users = [{ id: 1, username: 'admin', password: bcrypt.hashSync('password', 10) }];

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.debug(`Validating user: ${username}`);
  
    // Simulated user lookup (Replace with real DB query)
    const user = this.users.find((u) => u.username === username);
  
    if (user && bcrypt.compareSync(password, user.password)) {
      this.logger.debug(`User ${username} validated successfully`);
      return { id: user.id, username: user.username }; // ✅ Return user without password
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

  async register(username: string, password: string) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { id: this.users.length + 1, username, password: hashedPassword };
    this.users.push(newUser);
    return { message: 'User registered successfully' };
  }
}
