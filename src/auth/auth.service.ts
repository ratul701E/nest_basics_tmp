import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity) 
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService

  ) {}

  async addUser(user: UserDto) {
    const {username, password} = user

    const isExist = await this.userRepo.findOneBy({username})

    if(isExist) return "Username already in use"

    return await this.userRepo.save({
      username,
      password
    })

  }

  async validUser(user: UserDto) {
    const {username, password} = user
    const _user = await this.userRepo.findOneBy({
      username,
      password
    })

    if(_user) {
      return this.jwtService.sign({username})
    }
    return false
  }
  
  async getUser(username: string) {
    const _user = await this.userRepo.findOneBy({
      username,
    })

    return _user
  }
}
