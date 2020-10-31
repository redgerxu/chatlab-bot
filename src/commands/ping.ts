import discord from "discord.js"

module.exports = {
    "name": "ping",
    execute: (message: discord.Message, args: string[]) => {
        return message.channel.send("Pong!");
    }
}