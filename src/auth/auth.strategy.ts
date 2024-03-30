import { HttpException, Injectable } from "@nestjs/common";
import { PassportSerializer, PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "ratulratulratulratul"
        })
    }

    async validate(payload: any){
        const {username} = payload
        console.log("Validate called with username: ", username)
        const user = await this.authService.getUser(username)
        if(!user) throw new HttpException("Bad request vai", 100)
        return {user}
    }
}