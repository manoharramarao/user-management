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

    async create(user: User): Promise<number>{
        await this.addMandatoryItems(user);
        await this.addAuditItems(user);
        await this.db.collection('users').insertOne(user)
            .then(result => {
                return this.onCreateSuccess(result);
            })
            .catch(err => {
                this.onCreateError(err);
            });
        return;
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
            return result.insertedCount;
        }
    }

    private onCreateError(error){
        if(error){
            this.logger.debug(`error occurred during insert ${error}`);
        }
    }

}