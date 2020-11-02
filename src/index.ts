import Eris from "eris";
import fs from "fs";
require("dotenv").config();
const client = new Eris.CommandClient(process.env.token! ,{},{
    prefix: process.env.prefix!
});

client.registerCommand("ping", (message: Eris.Message):void => {
    message.channel.createMessage("Pong!");
}, {});

client.registerCommand("ban", (message: Eris.Message, args: string[]): void => {
    if (!message.member!.permission.json.banMembers) return;
    const target = message.mentions[0];
    let reason: string | undefined = args.join(" ");
    if (!reason.replace(/\s/g, '').length) reason = undefined;
    client.banGuildMember(message.guildID!, target.id, 0, reason)
        .then(result => message.channel.createMessage(`Banned ${target.username}`))
        .catch((err) => {
            message.channel.createMessage("An error occured. :(")
            console.error(err);
        });
}, {})

client.registerCommand("kick", (message: Eris.Message, args: string[]): void => {
    if (!(message.member!.permission.json.kickMembers)) return;
    const target = message.mentions[0];
    let reason: string | undefined = args.join(" ");
    if (!reason.replace(/\s/g, '').length) reason = undefined;
    client.kickGuildMember(message.guildID!, target.id, reason)
        .then(result => message.channel.createMessage(`Kicked ${target.username}`))
        .catch((err) => {
            message.channel.createMessage("An error occured. :(")
            console.error(err);
        });
}, {})

client.on("ready", () => {
    console.log("started");
})

client.connect();