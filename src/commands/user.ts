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
        }
        const embed = new MessageEmbed()
            .setAuthor(`${target!.user.username}${target!.user.discriminator}`, target.user.displayAvatarURL())
            .addFields(
                {name: "Joined At:", value: `${formatTime()}`},
                {name: "Nickname", value: `${target.nickname}`}
            )
            .setColor(target!.displayHexColor)
        message.channel!.send(embed);
    }
}