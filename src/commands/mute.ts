import { Message } from "discord.js";
import * as embeds from "../resources/embeds";

module.exports = {
    name: "mute",
    exec: async (message: Message, args: string[]): Promise<void> => {
        if (!message.member!.hasPermission("MUTE_MEMBERS")) {
            message.channel.send(embeds.errorEmbed("Insufficient Permissions"));
            return;
        }
        const target = message.mentions.members!.first();
        if (!target) {
            message.channel.send(embeds.errorEmbed("No target (must be mention)"));
            return;
        }
        try {
            const reason = args.slice(1).join(" ");
            const mutedRole = message.guild!.roles.cache.get("Muted");
            if (!mutedRole) {
                message.channel.send(embeds.errorEmbed("Please create a role named \"Muted\""));
                return;
            }
            message.member!.roles.add(mutedRole, reason);
        } catch {
            message.channel.send(embeds.errorEmbed("I cannot mute that user"));
            return;
        }
        message.channel.send(embeds.successEmbed(`Muted ${target.user.username}`));
    }
}