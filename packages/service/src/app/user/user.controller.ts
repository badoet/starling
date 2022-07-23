import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UserService } from './user.service'
import { User } from './user.entity'
import { CreateUserDto } from './user.dto'

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getUsers(): Promise<User[]> {
    const users = await this.userService.getUsers()
    return users
  }

  @Get('/:id')
  public async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const user = await this.userService.getUser(id)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  @Post('/')
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto)
    return user
  }
}
