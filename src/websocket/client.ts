import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params;

    const userExists = await usersService.findByEmail(email);

    if (userExists) {
      const connection = await connectionsService.findByUserId(userExists.id);

      if (connection) {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      } else {
        await connectionsService.create({
          user_id: userExists.id,
          socket_id,
        });
      }
    } else {
      const user = await usersService.create(email);
      await connectionsService.create({
        user_id: user.id,
        socket_id,
      });
    }
  });
});
