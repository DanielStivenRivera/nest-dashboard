import { Injectable } from '@nestjs/common';
import { LoginUserDTO } from 'src/dto/user.dto';
import { UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {

    constructor (private userService: UserService) {

    }

    private async comparePassword(user: UserDocument, loginDTO: LoginUserDTO): Promise<boolean> {
        return await bcrypt.compare(loginDTO.password, user.password);
    }

    async validateUser (loginUserDTO: LoginUserDTO) {
        const user = await this.userService.getUserByEmail(loginUserDTO.email);
        if(user && await this.comparePassword(user, loginUserDTO)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
        
    }

}
