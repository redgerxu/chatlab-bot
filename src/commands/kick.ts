import { Message } from "discord.js";
import * as embeds from "../resources/embeds";
import { commandName } from "../resources/helper";

module.exports = {
    name: commandName(__filename),
    description: "Kicks a mentioned user",
    usage: "-kick <mentioned user>",
    exec: async (message: Message, args: string[]): Promise<void> => {
        if (!message.member!.hasPermission("KICK_MEMBERS")) {
            message.channel.send(embeds.errorEmbed("Insufficient Permissions"));
            return;
        }
        const target = message.mentions.members!.first();
        if (!target) {
            message.channel.send(embeds.errorEmbed("No target (must be mention)"));
            return;
        }
        if (target.id == message.member!.id) {
            message.channel.send(embeds.errorEmbed("Target cannot be yourself"));
            return;
        }
        const reason = args.join(" ");
        try {
            await target.kick(reason);
        } catch {
            message.channel.send(embeds.errorEmbed("I cannot kick that user"));
            return;
        }
        message.channel.send(embeds.successEmbed(`Kicked ${target.user.username}`));
    }
};