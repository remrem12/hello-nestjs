import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: AuthDTO) {
    try {
      return await this.authService.register(body);
    } catch (error) {
      return { error };
    }
  }

  @Post('login')
  async login(@Body() body: AuthDTO) {
    // try {
    return await this.authService.login(body);
    // } catch (error) {
    //   return { error };
    // }
  }
}
