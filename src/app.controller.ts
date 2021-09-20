import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserDTO, LoginUserDTO } from './dto/user.dto';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @Post('user/register')
  register(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.CreateUser(createUserDTO);
  }
  //@UseGuards(LocalAuthGuard)
  @Post('user/login')
  login(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(loginUserDTO);
  }

  @UseGuards(JwtGuard)
  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.userService.GetUser(id);
  }

  @Get()
  Home() {
    return 'Dashboard backend'
  }

}
