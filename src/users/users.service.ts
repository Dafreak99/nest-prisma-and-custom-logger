import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, User } from 'src/types';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'User 1',
      email: 'user1@example.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'User 2',
      email: 'user2@example.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'User 3',
      email: 'user3@example.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'User 4',
      email: 'user4@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'User 5',
      email: 'user5@example.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: Role) {
    if (role) {
      const users = this.users.filter((user) => user.role === role);

      if (users.length === 0) {
        throw new NotFoundException(`Users with role ${role} not found`);
      }

      return users;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  create(user: CreateUserDto) {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);

    return newUser;
  }
  update(id: number, updatedUser: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) {
      return null;
    }

    Object.assign(user, updatedUser);

    return user;
  }
  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }

    const deletedUser = this.users[index];
    this.users.splice(index, 1);

    return deletedUser;
  }
}
