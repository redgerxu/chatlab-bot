import discord from "discord.js"

module.exports = {
    "name": "ping",
    execute: (message: discord.Message) => {
        return message.channel.send("Pong!");
    }
}