import { MessageEmbed } from "discord.js";

export const errorEmbed = (msg: string, color?: string): MessageEmbed => {
    if (!color) color = "#FF0000";
    const embed = new MessageEmbed()
        .setTitle("ERROR")
        .addField("Reason:", msg)
        .setColor(color)
        .setTimestamp();
    return embed;
};

export const successEmbed = (msg: string, color?: string): MessageEmbed => {
    if (!color) color = "#00FF00";
    const embed = new MessageEmbed()
        .addField("Success", msg)
        .setColor(color)
        .setTimestamp();
    return embed;
};