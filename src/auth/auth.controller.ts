import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { MyAuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() user: UserDto) {
    return await this.authService.addUser(user)
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() user: UserDto){
    return await this.authService.validUser(user)
  }

  @Get()
  @UseGuards(AuthGuard())
  async test(@Req() request: Request) {
    console.log(request)
    return "request successfull"
  }

  @Get('middleware')
  @UseGuards(MyAuthGuard)
  async lol(){
    return "success"
  }
}
