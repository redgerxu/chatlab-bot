import { Message } from "discord.js";
module.exports = {
    name: "ping",
    exec: (message: Message): void => {
        message.channel.send("Pong!");
    }
}