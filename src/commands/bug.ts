import { Message } from "discord.js";
import { commandName } from "../resources/helper";

module.exports = {
    name: commandName(__filename),
    exec: (message: Message): void => {
        message.channel.send("Have a bug? Visit the issues page of the repo here\nhttps://github.com/narutopig/chatlab-bot/issues");
    }
};