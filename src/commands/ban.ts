import { Message } from "discord.js";
import * as embeds from "../resources/embeds";
import { commandName } from "../resources/helper";

module.exports = {
    name: commandName(__filename),
    description: "Ban a mentioned user",
    usage: "-ban <mentioned user>",
    exec: async (message: Message, args: string[]): Promise<void> => {
        if (!message.member!.hasPermission("BAN_MEMBERS")) {
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
            await target.ban({ reason: reason });
        } catch {
            message.channel.send(embeds.errorEmbed("I cannot ban that user"));
            return;
        }
        message.channel.send(embeds.successEmbed(`Banned ${target.user.username}`));
    }
};