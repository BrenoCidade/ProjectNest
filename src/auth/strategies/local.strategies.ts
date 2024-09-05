import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { MessageHelper } from "src/helpers/message.heper";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService){
    super({usernameField: 'email'});
    }

    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);

        if (!user) throw new UnauthorizedException(MessageHelper.password_or_email_invalid);

        return user;
    }
}