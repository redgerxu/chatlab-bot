import { Message, MessageEmbed } from "discord.js";
import { commandName, randprop } from "../resources/helper";
import { commands } from "../resources/load";
import { errorEmbed } from "../resources/embeds";
import { colors } from "../resources/colors";
import { readdirSync } from "fs";

module.exports = {
    name: commandName(__filename),
    description: "Provides info on how to use this bot",
    usage: "-help <category|command>",
    exec: (message: Message, args: string[]): Promise<Message> => {
        type helptype = "command" | "overview";
        let type: helptype;
        if (args[0]) type = "command";
        else type = "overview";
        let embed = new MessageEmbed();
        switch (type) {
            case "command":
                const cname = args[0];
                const command = commands.get(cname);
                if (!command) {
                    return message.channel.send(errorEmbed("Command not found"));
                }
                embed.setTitle(`${process.env.prefix}${cname}`)
                    .addFields(
                        { name: "Description", value: command.description || "Not Provided" },
                        { name: "Usage", value: command.usage || "Not Provided" }
                    )
                    .setColor(randprop(colors))
                    .setTimestamp();
                break;
            case "overview":
                embed.setTitle("Commands")
                    .setColor(randprop(colors))
                    .setTimestamp();
                let cfiles = readdirSync(__dirname).filter(file => file.endsWith(".ts"));
                for (const c of cfiles) {
                    console.log(c);
                    const command = require("./" + c);
                    embed.addField(`${process.env.prefix}${command.name}`, command.description);
                }
                break;
        }
        return message.channel.send(embed);
    }
};
