import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateTaskDTO } from './dto/task.dto';
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

  @UseGuards(JwtGuard)
  @Get('profile/:id/tasks')
  getUserTasks(@Param('id') id: string) {
    return this.userService.GetUserTasks(id);
  }

  @UseGuards(JwtGuard)
  @Get('task/:id')
  GetTask(@Param('id') id : string) {
    return this.userService.GetTask(id);
  }

  @UseGuards(JwtGuard)
  @Delete('tasks/:id')
  DeleteTask(@Param('id') id : string) {
    return this.userService.DeleteTask(id);
  }

  @UseGuards(JwtGuard)
  @Post('task/create')
  CreateTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.userService.CreateTask(createTaskDTO);
  }

  @UseGuards(JwtGuard)
  @Post('task/:id')
  UpdateTask(@Param('id') id: string, @Body() createTaskDTO: CreateTaskDTO) {
    return this.userService.UpdateTask(id, createTaskDTO);
  }

}
