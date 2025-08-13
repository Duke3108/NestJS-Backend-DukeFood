import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        return await this.userService.validateUser(email, password);
    }

    async login({id, role}) {
        //tra ve access token JWT
        const accessToken = await this.jwtService.signAsync({
            uid: id,
            role,
        });
        return {message: 'login success', accessToken};
    }
}
