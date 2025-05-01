import { Injectable } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
    private readonly users: UsersDto[] = [];

    create(newUser: UsersDto) {
        newUser.id = uuid();
        newUser.password = bcryptHashSync(newUser.password, 20); // esse segundo argumento '20' é para passar a quantidade de vezes que a senha vai ser incriptada, ou seja maior = melhor
        this.users.push(newUser);
        console.log(this.users);
    }
}
