import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Command, CommandRunner } from 'nest-commander';

import { CreateUserDto, UsersService } from './modules/users';

export const DEPARTMENTS_VALUES = ['hr', 'sales', 'support', 'marketing', 'development'] as const;
export const GRADE_VALUES = ['intern', 'junior', 'middle', 'senior', 'lead'] as const;

const randomFromArray = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)]

@Command({ name: 'seed', description: 'Seed database with users' })
@Injectable()
export class SeedCommand extends CommandRunner {
  private readonly logger = new Logger(SeedCommand.name);

  constructor(private readonly userService: UsersService) {
    super();
  }

  async run(): Promise<void> {
    // Предопределенный список админов
    const admins: CreateUserDto[] = [
      {
        email: 'admin@mail.com',
        password: 'Admin!23',
        firstName: 'Admin',
        lastName: 'Super',
        personalPhones: [],
        officeAddress: 'hello, 7',
        department: 'development',
        workPhone: '79204574579',
        birthday: '2005-08-01',
        grade: 'junior',
        about: 'generated user :)',
      },
    ];

    for (const admin of admins) {
      const hashedPassword = await bcrypt.hash(admin.password, 6);

      try {
        await this.userService.create({
          ...admin,
          password: hashedPassword,
        });
        this.logger.log(`Created admin ${admin.email}`);
      } catch (error) {
        this.logger.error(`Failed to create admin ${admin.email}`, error as any);
      }
    }

    // 50 случайных пользователей
    for (let i = 0; i < 50; i++) {
      try {
        await this.userService.create({
          email: faker.internet.email().toLowerCase(),
          password: await bcrypt.hash(faker.internet.password(), 6),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          personalPhones: [],
          officeAddress: `${faker.location.country()}, ${faker.location.city()}`,
          department: randomFromArray(DEPARTMENTS_VALUES),
          workPhone: faker.phone.number({ style: 'international' }),
          birthday: faker.date.birthdate().toISOString().slice(0, 10),
          grade: randomFromArray(GRADE_VALUES),
          about: faker.person.bio(),
        });
      } catch (error) {
        this.logger.warn(`Failed to create user #${i}`, error as any);
      }
    }

    this.logger.log('Seeding completed!');
  }
}
