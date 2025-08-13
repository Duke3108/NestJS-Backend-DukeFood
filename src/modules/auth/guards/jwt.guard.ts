
import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any) {
        if (err) {
            throw new UnauthorizedException('Bạn không có quyền truy cập');
        }
        if(!user){
            if(info?.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Phiên đăng nhập đã hết hạn');
            }else if(info?.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('Token không hợp lệ');
            }else{
                throw new UnauthorizedException('Bạn không có quyền truy cập');
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return user;
    }
}
