import { Message, MessageEmbed } from "discord.js";
import { commandName, formatTime } from "../resources/helper";
import getUser from "../resources/hypixelAPI";

module.exports = {
    name: commandName(__filename),
    exec: async (message: Message, args: string[]): Promise<void> => {
        const name = args[0];
        if (!name) {
            message.channel.send("Please provide a username");
            return;
        }
        const p = await getUser(name);
        if (!p) {
            message.channel.send("Invalid username");
            return;
        }
        const player = p.player;
        const embed = new MessageEmbed() // oh boy this is a long one
            .setTitle(player.playername)
            .addFields(
                {name: "First Login", value: formatTime(player.firstLogin), inline: true},
                {name: "Last Login", value: formatTime(player.lastLogin), inline: true},
                {name: "Karma", value: player.karma, inline: true},
                {name: "Achievement Points", value: player.achievementPoints, inline: true},
                {name: "Version", value: player.mcVersionRp || "N/A", inline: true}
                // {name: "Rank", value: player.newPackageRank.replace("_PLUS", "+"), inline: true}
            )
            .setTimestamp();
        message.channel.send(embed);
        return;
    }
};