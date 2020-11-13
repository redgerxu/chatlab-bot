import { Message, MessageEmbed } from "discord.js";
import * as helper from "../resources/helper";
import { urls } from "../resources/apiURL";
import fetch from "node-fetch";
import { colors } from "../resources/colors";

module.exports = {
    name: helper.commandName(__filename),
    description: "Gets some information about a Hypixel player",
    usage: "-hypixel <Hypixel Player>",
    exec: async (message: Message, args: string[]): Promise<Message> => {
        const name = args[0];
        if (!name) {
            return message.channel.send("Please provide a username");
        }
        const pdata = await fetch(`${urls.mojang}/users/profiles/minecraft/${name}`).then(res => res.json()).catch((err) => {
            console.log(err);
            return message.channel.send("There was an error :(");
        });
        const p = await fetch(`${urls.hypixel}/player?uuid=${pdata.id}&key=${process.env.hypixelKey}`).then(res => res.json());
        const status = await fetch(`${urls.hypixel}/status?uuid=${pdata.id}&key=${process.env.hypixelKey}`).then(res => res.json());
        const player = p.player;
        if (!p.success || !player) {
            return message.channel.send("There was an error :(");
        }
        const embed = new MessageEmbed() // oh boy this is a long one
            .setTitle(pdata.name)
            .addFields(
                { name: "First Login", value: helper.formatTime(player.firstLogin) || "N/A", inline: true },
                { name: "Last Login", value: helper.formatTime(player.lastLogin) || "N/A", inline: true },
                { name: "Karma", value: player.karma || "N/A", inline: true },
                { name: "Achievement Points", value: player.achievementPoints || "N/A", inline: true },
                { name: "Version", value: player.mcVersionRp || "N/A", inline: true },
                { name: "Online", value: helper.yesno(status.session.online), inline: true }
            )
            .setColor(helper.randprop(colors))
            .setTimestamp();
        if (status.session.online) {
            embed.addField("Game", helper.title(status.session.gameType), true);
            embed.addField("Mode/location", helper.title(status.session.mode), true);
        }
        return message.channel.send(embed);
    }
};