import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/models';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super(
        {
            usernameField: 'email',
        }
    );
  }

  async validate(email: string, password: string): Promise<User | null> {
    return await this.userService.validateUser(email, password);
    //passport se gan len req.user
  }
}
