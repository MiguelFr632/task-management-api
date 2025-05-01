import { Injectable } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcryptjs'; // tive que instalar a biblioteca do bcryptjs ao invez da bcrypt, estava dando um erro não sei por que

@Injectable()
export class UsersService {
    private readonly users: UsersDto[] = [];

    create(newUser: UsersDto) {
        newUser.id = uuid();
        newUser.password = bcryptHashSync(newUser.password, 12); // esse segundo argumento '12' é para passar a quantidade de vezes que a senha vai ser incriptada, ou seja maior = melhor
        this.users.push(newUser);
    }

    findByUserName(username: string): UsersDto | undefined {
        return this.users.find((u) => u.username === username);
    }
}
