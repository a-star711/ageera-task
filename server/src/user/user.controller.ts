import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Logger } from '@nestjs/common';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  private readonly validEmail = 'tutorial@appgr8.com';
  private readonly validPassword = 'Appgr8';

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    try {
      this.logger.log(`Login attempt for ${loginDto.email}`);

      if (
        loginDto.email === this.validEmail &&
        loginDto.password === this.validPassword
      ) {
        this.logger.log(`Successful login for ${loginDto.email}`);
        return {
          success: true,
          message: 'Login successful',
        };
      }

      this.logger.warn(`Failed login attempt for ${loginDto.email}`);
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid credentials',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Login error: ${error.message}`);
      } else {
        this.logger.error(`Login error: ${String(error)}`);
      }
      throw error;
    }
  }
}
