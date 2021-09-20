import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from 'src/dto/user.dto';
import { UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor (private userService: UserService, private jwtService: JwtService) {

    }

    private async comparePassword(user: UserDocument, loginDTO: LoginUserDTO): Promise<boolean> {
        return await bcrypt.compare(loginDTO.password, user.password);
    }

    async validateUser (loginUserDTO: LoginUserDTO) {
        const user = await this.userService.getUserByEmail(loginUserDTO.email);
        if(user && await this.comparePassword(user, loginUserDTO)) {
            const { password, ...result } = user;
            const payload = { id: user._id, email: user.email};
            return {token: this.jwtService.sign(payload)}
        }
        throw new UnauthorizedException();
        
    }

    async login(user: any) {
        const payload = { id: user._id, email: user.email };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

}
