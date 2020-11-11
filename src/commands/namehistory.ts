import { Message, MessageEmbed } from "discord.js";
import { commandName, randint } from "../resources/helper";
import fetch from "node-fetch";
import { urls } from "../resources/apiURL";
import { colors } from "../resources/colors";

module.exports = {
    name: commandName(__filename),
    exec: async (message: Message, args: string[]): Promise<Message> => {
        const user = await fetch(`${urls.mojang}/users/profiles/minecraft/${args[0]}`).then(res => res.json());
        const names = await fetch(`${urls.mojang}/user/profiles/${user.id}/names`).then(res => res.json());
        const embed = new MessageEmbed()
            .setTitle(`${user.name}\'s Name History`)
            .setTimestamp();
        let string = "";
        for (const name of names) {
            string += name.name + "\n";
        }
        embed.addField("Names:", string);
        return message.channel.send(embed);
    }
};