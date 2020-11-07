import { GuildMember, Message, MessageEmbed } from "discord.js";
import { commandName } from "../resources/helper";

module.exports = {
    name: commandName(__filename),
    exec: (message: Message) => {
        let target: GuildMember;
        if (!message.mentions.members!.first()) {
            target = message.member!;
        } else {
            target = message.mentions.members!.first()!;
        }

        const formatTime = () => {
            const date = target.joinedAt;
            return `${date!.getMonth() + 1}/${date!.getDate()}/${date!.getUTCFullYear()}`;
        };

        const embed = new MessageEmbed()
            .setAuthor(`${target!.user.username}${target!.user.discriminator}`, target.user.displayAvatarURL())
            .setColor(target!.displayHexColor);

        let rolesString = "";
        for (const role of target.roles.cache) {
            rolesString += role[1].toString() + ", ";
        }

        rolesString.slice(0,-1); // remove extra char

        embed.addFields(
            {name: "Roles", value: rolesString, inline: false},
            {name: "Joined At", value: `${formatTime()}`, inline: true},
            {name: "Nickname", value: `${target.nickname}`, inline: true},
            {name: "Human", value: `${!target.user.bot}`, inline: true},
            {name: "ID", value: target.user.id}
        );

        message.channel!.send(embed);
    }
};