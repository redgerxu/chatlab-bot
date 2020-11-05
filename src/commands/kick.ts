import { Message } from "discord.js";
import * as embeds from "../resources/embeds";

module.exports = {
    name: "kick",
    exec: async (message: Message, args: string[]): Promise<void> => {
        if (!message.member!.hasPermission("KICK_MEMBERS")) {
            message.channel.send(embeds.errorEmbed("Insufficient Permissions"));
            return;
        }
        const target = message.mentions.members!.first();
        if(!target) {
            message.channel.send(embeds.errorEmbed("No target (must be mention)"));
            return;
        }
        const reason = args.join(" ");
        try {
            await target.kick(reason)
        } catch {
            message.channel.send(embeds.errorEmbed("I cannot kick that user"));
            return;
        }
        message.channel.send(embeds.successEmbed(`Kicked ${target.user.username}`));
    }
}