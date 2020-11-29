import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './user.dao';
import { IsUserExistConstraint } from './validators/userid.validator';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        UserDao,
        IsUserExistConstraint
    ],
})
export class UserModule {}
