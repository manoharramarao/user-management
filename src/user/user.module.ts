import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDao } from './user.dao';
import { DoesUserExistConstraint } from './validators/userid.validator';

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
        DoesUserExistConstraint
    ],
})
export class UserModule {}
