import { Injectable } from '@nestjs/common';
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let exists = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (exists) {
      throw new UnprocessableEntityException(
        'User with this username already exists',
      );
    }

    exists = await this.userRepository.findOne({
      where: { phone: createUserDto.phone },
    });
    if (exists) {
      throw new UnprocessableEntityException(
        'User with this phone already exists',
      );
    }

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByPhone(phone: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { phone: phone },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    const updatedUser = await this.userRepository.save(
      Object.assign({ id: user.id }, updateUserDto),
    );

    if (!updatedUser) {
      throw new InternalServerErrorException('User not updated');
    }

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findById(id);

    const deleted = await this.userRepository.remove(user);

    if (!deleted) {
      throw new InternalServerErrorException('User not deleted');
    }
  }
}
