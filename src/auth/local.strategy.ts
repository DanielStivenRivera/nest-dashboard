import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { LoginUserDTO } from "src/dto/user.dto";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super();
    }

    async validate(loginUserDTO: LoginUserDTO) {
        
        const user = await this.authService.validateUser(loginUserDTO);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}