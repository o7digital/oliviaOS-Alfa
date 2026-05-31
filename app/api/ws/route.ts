import { Server } from "socket.io";

let io: Server | undefined;

export async function GET() {
  if (!io) {
    io = new Server({
      path: "/api/ws",
    });

    io.on("connection", (socket) => {
      console.log("Client connected");

      setInterval(() => {
        socket.emit("new_mail", {
          from: "Live User",
          subject: "Nouveau mail en temps réel",
          deal: "€25k potentiel",
          context: "Live opportunity détectée.",
          content: "Ceci est un mail simulé en temps réel.",
        });
      }, 15000);
    });
  }

  return new Response("WebSocket running");
}
