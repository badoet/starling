import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './user.entity'
import { CreateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(createUserDto)
    return await this.userRepo.save(user)
  }

  public async getUser(id: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ id })
  }

  public async getUsers(): Promise<User[]> {
    return await this.userRepo.find()
  }
}
