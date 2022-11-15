import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // how to interact with databse?
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findUsers() {}

  createuser() {}
}
