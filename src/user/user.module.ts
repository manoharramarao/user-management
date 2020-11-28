import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './user.dao';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        UserDao
    ],
})
export class UserModule {}
