import { Inject, Injectable, Logger } from '@nestjs/common';
import { Db } from 'mongodb';
import { User } from './model/user.model';
import { UserDao } from './user.dao';
import { v4 as uuidv4 } from 'uuid';
import { Address } from './model/address.model';

@Injectable()
export class UserService {
    private logger = new Logger('UserService');

    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db,
        private userDao: UserDao
    ){}

    async signUp(body: User): Promise<User> {
        return await this.userDao.create(body);
    }

    async upsertAddressForUser(address: Address): Promise<boolean>{
        return await this.userDao.upsertAddressForUser(address);
    }
}
