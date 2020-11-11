import { GuildMember, Message, MessageEmbed } from "discord.js";
import { commandName, formatTime } from "../resources/helper";

module.exports = {
    name: commandName(__filename),
    exec: (message: Message, args: string[]) => {
        let target = message.mentions.members!.first() || message.member; // || message.guild!.members.cache.get(args[0])
        const embed = new MessageEmbed()
            .setAuthor(`${target!.user.username}#${target!.user.discriminator}`, target!.user.displayAvatarURL())
            .setColor(target!.displayHexColor);

        embed.addFields(
            {name: "Roles", value: target!.roles.cache.array().join(" "), inline: false},
            {name: "Joined At", value: `${formatTime(target!.joinedAt!)}`, inline: true},
            {name: "Nickname", value: `${target!.nickname || target!.user.username}`, inline: true},
            {name: "Human", value: `${!target!.user.bot}`, inline: true},
            {name: "ID", value: target!.user.id}
        );

        message.channel!.send(embed);
    }
};