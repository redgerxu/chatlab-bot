import { Message } from "discord.js";
module.exports = {
    name: "ping",
    exec: (message: Message, args: string[]): void => {
        message.channel.send("Pong!");
        return;
    }
}