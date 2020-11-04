import discord from "discord.js";
import "dotenv/config";
import fs from "fs";

const client = new discord.Client();
const commands = new Map();

// commmand loading
const files = fs.readdirSync(__dirname + "/commands/");
for (const file of files) {
    console.log(file);
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

client.on("message", (message: discord.Message): void => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.prefix!)) return;
    
    const command = message.content.split(" ")[0].slice(1);
    const args = message.content.split(" ").slice(1);

    commands.get(command).exec(message, args);
})

client.on("ready", () => {
    console.log(`${client.user!.username} has started`);
})

client.login(process.env.token!);