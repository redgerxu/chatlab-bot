import { Message } from "discord.js";
import { commandName } from "../resources/helper";

module.exports = {
    name: commandName(__filename),
    description: "Pong!",
    usage: "-ping",
    exec: (message: Message): void => {
        message.channel.send("Pong!");
    }
};