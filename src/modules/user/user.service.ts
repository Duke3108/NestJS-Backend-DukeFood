import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userModel: typeof User,
        private readonly jwtService: JwtService,
    ) {}

    async findByEmail(email: string) {
        return this.userModel.findOne({where: {email}});
    }

    async validateUser(email: string, password: string) {
        const user = await this.findByEmail(email);
        if (!user) throw new BadRequestException('Tài khoản không tồn tại');
        const isCorrectPassword = user.comparePassword(password);
        if (!isCorrectPassword) throw new BadRequestException('Sai mật khẩu');
        return user
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.findByEmail(createUserDto.email);
        if (user) throw new BadRequestException('Email đã tồn tại');
        await this.userModel.create(createUserDto as any);
        return {message: 'Đăng ký thành công'};
    }
}
