import { Inject, Injectable, Logger } from "@nestjs/common";
import { Db } from "mongodb";
import { User } from "./model/user.model";
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { UserGroups } from './model/user-groups.enum';

@Injectable()
export class UserDao {

    private logger = new Logger('UserDao');

    constructor(
        @Inject('DATABASE_CONNECTION')
        private db: Db
    ){}

    async create(user: User): Promise<User>{
        await this.addMandatoryItems(user);
        await this.addAuditItems(user);
        await this.db.collection('users').insertOne(user)
            .then(result => {
                user = this.onCreateSuccess(result);
            })
            .catch(err => {
                this.onCreateError(err);
                throw err;
            });
        return user;
    }

    async doesUserExist(userId: string): Promise<boolean>{
        return await this.db.collection('users').findOne({userId: userId})
            .then(result => {
                if(!result){
                    return false;
                }else{
                    return true;
                }
            })
            .catch(err => {
                throw new err;
            });
    }

    private async addMandatoryItems(user: User): Promise<void>{
        if(!user.code){
            user.code = await uuidv4();
        }
        if(!user.userGroups){
            user.userGroups = [];
            await user.userGroups.push(UserGroups.ANONYMOUS_USER); 
        }
    }

    private async addAuditItems(user: User): Promise<void>{
        if(!user.createdAt){
            user.createdAt = await moment.utc().toDate();
        }
        if(!user.updatedAt){
            user.updatedAt = await moment.utc().toDate();
        }
    }

    private onCreateSuccess(result){
        if(result){
            this.logger.debug(`User inserted successfully ${result}`);
            let user = new User();
            user = result.ops[0];
            return user;
        }
    }

    private onCreateError(error){
        if(error){
            this.logger.debug(`error occurred during insert ${error}`);
            this.logger.error(error);
        }
    }

}