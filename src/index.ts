import Eris from "eris";
import fs from "fs";
require("dotenv").config();
const client = new Eris.CommandClient(process.env.token! ,{},{
    prefix: "-"
});

client.registerCommand("ping", (message: Eris.Message):void => {
    message.channel.createMessage("Pong!");
}, {});

client.registerCommand("ban", (message: Eris.Message, args: string[]): void => {
    if (!(message.member!.permission.json.ban)) return;
    const target = message.mentions[0];
    let reason: string | undefined = args.join(" ");
    if (!reason.replace(/\s/g, '').length) reason = undefined;
    try {
        client.banGuildMember(message.guildID!, target.id, 0, reason);
        message.channel.createMessage(`Banned ${target.username}`);
    } catch {
        message.channel.createMessage("An error occured. :(")
    }
}, {})

client.registerCommand("kick", (message: Eris.Message, args: string[]): void => {
    if (!(message.member!.permission.json.kick)) return;
    const target = message.mentions[0];
    let reason: string | undefined = args.join(" ");
    if (!reason.replace(/\s/g, '').length) reason = undefined;
    try {
        client.kickGuildMember(message.guildID!, target.id, reason);
        message.channel.createMessage(`Kicked ${target.username}`);
    } catch {
        message.channel.createMessage("An error occured. :(")
    }
}, {})

client.on("ready", () => {
    console.log("started");
})

client.connect();