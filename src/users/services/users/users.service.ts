import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // how to interact with databse?
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findUsers() {
    return this.userRepository.find();
  }

  createuser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      // create는 sync
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser); // save는 async로 동작하기 때문에 프로미스를 반환한다.
  }
}
