import { getCustomRepository, Repository } from "typeorm";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";
import { Connection } from "../entities/Connection";

interface IConnectionCreate {
  user_id: string;
  socket_id: string;
  admin_id?: string;
  id?: string;
}

export class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ user_id, socket_id, admin_id, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      user_id,
      socket_id,
      admin_id,
      id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connection = await this.connectionsRepository.findOne({
      user_id,
    });
    return connection;
  }

  async findAllWithoutAdmin() {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"],
    });
    return connections;
  }
}
