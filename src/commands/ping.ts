import { Message } from "discord.js";
import { commandName } from "../resources/helper";

module.exports = {
    name: commandName(__filename),
    exec: (message: Message): void => {
        message.channel.send("Pong!");
    }
};