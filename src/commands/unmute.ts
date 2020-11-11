import { Message } from "discord.js";
import * as embeds from "../resources/embeds";
import { commandName } from "../resources/helper";

module.exports = {
    name: commandName(__filename),
    description: "Removes a role named Muted from a user",
    usage: "-unmute <mentioned user>",
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
			const mutedRole = message.guild!.roles.cache.filter(r => r.name == "Muted");
			if (!mutedRole) {
				message.channel.send(embeds.errorEmbed("Please create a role named \"Muted\""));
				return;
			}
            target!.roles.remove(mutedRole, reason);
		} catch {
			message.channel.send(embeds.errorEmbed("I cannot unmute that user"));
			return;
		}
		message.channel.send(embeds.successEmbed(`Unmuted ${target.user.username}`));
	}
};