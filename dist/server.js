import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("hi there");
});
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    ws.on("message", function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send("Hello! Message From Server!!");
});
const PORT = 8080;
server.listen(PORT, function () {
    console.log(`${new Date()} Server is listening on port ${PORT}`);
});
console.log("this is just for Git Commit ");
//# sourceMappingURL=server.js.map