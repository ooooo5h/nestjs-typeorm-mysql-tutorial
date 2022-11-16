import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/users';
import {
  CreateUserParams,
  UpdateUserParams,
  CreateUserProfileParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // how to interact with databse?
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
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

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;

    return this.userRepository.save(user);
  }
}
