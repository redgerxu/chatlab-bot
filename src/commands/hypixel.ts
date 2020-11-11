import { Message, MessageEmbed } from "discord.js";
import { commandName, formatTime, title, yesno } from "../resources/helper";
import { urls } from "../resources/apiURL";
import fetch from "node-fetch";
import { colors } from "../resources/colors";

module.exports = {
    name: commandName(__filename),
    exec: async (message: Message, args: string[]): Promise<void> => {
        const name = args[0];
        if (!name) {
            message.channel.send("Please provide a username");
            return;
        }
        const pdata = await fetch(`${urls.mojang}/users/profiles/minecraft/${name}`).then(res => res.json());
        const p = await fetch(`${urls.hypixel}/player?uuid=${pdata.id}&key=${process.env.hypixelKey}`).then(res => res.json());
        const status = await fetch(`${urls.hypixel}/status?uuid=${pdata.id}&key=${process.env.hypixelKey}`).then(res => res.json());
        const player = p.player;
        console.log(status);
        if (!p.success) {
            message.channel.send("There was an error :(");
            return;
        }
        const embed = new MessageEmbed() // oh boy this is a long one
            .setTitle(pdata.name)
            .addFields(
                {name: "First Login", value: formatTime(player.firstLogin), inline: true},
                {name: "Last Login", value: formatTime(player.lastLogin), inline: true},
                {name: "Karma", value: player.karma, inline: true},
                {name: "Achievement Points", value: player.achievementPoints, inline: true},
                {name: "Version", value: player.mcVersionRp || "N/A", inline: true},
                {name: "Online", value: yesno(status.session.online), inline: true}
            )
            .setTimestamp();
        if (status.session.online) {
            embed.addField("Game", title(status.session.gameType), true);
            embed.addField("Mode/location", title(status.session.mode), true);
        }
        message.channel.send(embed);
        return;
    }
};