import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

export class UsersService {
  async create(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    // Verificar se o usuario existe
    const userExists = await usersRepository.findOne({
      email,
    });

    // Se existir, retornar user
    if (userExists) {
      return userExists;
    }

    // Se nao existir, salvar no BD
    const user = usersRepository.create({
      email,
    });

    await usersRepository.save(user);
    return user;
  }
}
