import { StringRequired } from "src/common/decorators";

export class CreateUserDto {
    @StringRequired('Email')
    email: string;

    @StringRequired('Mật khẩu')
    password: string;

    @StringRequired('Tên')
    name: string;
}
