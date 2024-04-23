import { Injectable } from '@nestjs/common';
import { Users } from './../../entities/users/users'

@Injectable()
export class UsersService {

    private UsersSchema: Users[] = [{
        id: 1,
        name: 'Deivi',
        email: 'd@g.com'
    }]



}
