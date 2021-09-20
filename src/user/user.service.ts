import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, LoginUserDTO } from 'src/dto/user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async CreateUser(createUserDTO: CreateUserDTO) {

        const userDB = await this.userModel.findOne({email: createUserDTO.email});
        console.log('user not exists');
        if(!userDB) {
            console.log('user not exists');
            createUserDTO.password = await bcrypt.hash(createUserDTO.password, 15);
            const user = new this.userModel(createUserDTO);
        
            return await user.save();
            
        }
        throw new HttpException('user already exists', HttpStatus.CONFLICT);
        
    }

    async getUserByEmail(email: string) {
        return await this.userModel.findOne({email});
    }

    async GetUser(id: string) {
        const user = await this.userModel.findById(id);
        if(!user) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async UpdatePassword(userID: string, password: string) {
        const user = await this.userModel.findByIdAndUpdate(userID, {password}, {new: true});

        if(!user) {
            throw new HttpException('password not updated', HttpStatus.NOT_MODIFIED);
        }
        return user;
    }

}
