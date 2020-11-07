import discord from "discord.js";
import "dotenv/config";
import fs from "fs";

/*
interface epicClient extends discord.Client {
    commands: Map<string, NodeModule>
}
*/
// still working on above ^

const client = new discord.Client();
const commands = new Map();

// commmand loading
const files = fs.readdirSync(__dirname + "/commands/").filter(file => file.endsWith(".ts"));
for (const file of files) {
    const command = require(`./commands/${file}`);
    commands.set(command.name, command);
}

client.on("message", async (message: discord.Message): Promise<void> => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(process.env.prefix!)) return;
    
    const mutedRole = message.guild.roles.cache.get("Muted");

    if (mutedRole) {
        if (message.member!.roles.cache.has(mutedRole!.id)) {
            try {
                await message.delete();
            } catch (e) {
                console.log(e);
            }
        }
    }
    const command = message.content.split(" ")[0].slice(1);
    const args = message.content.split(" ").slice(1);
    try {
        commands.get(command).exec(message, args);
    } catch (err) {
        console.error(err);
    }
})

client.on("ready", () => {
    console.log(`${client.user!.username} has started`);
    console.table(commands);
    client.user!.setActivity("games", {type: "PLAYING"});
})

client.login(process.env.token!);