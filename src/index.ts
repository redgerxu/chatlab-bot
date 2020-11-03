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
        .then(() => message.channel.createMessage(`Kicked ${target.username}`))
        .catch((err) => {
            message.channel.createMessage("An error occured. :(")
            console.error(err);
        });
}, {})

client.registerCommand("mute", (message: Eris.Message, args: string[]): void => {
    if (!(message.member!.permission.json.manageMessages)) return;
    const target = message.mentions[0];
    let reason: string | undefined = args.join(" ");
    if (!reason.replace(/\s/g, '').length) reason = undefined;
    const role = message.member!.guild.roles.filter(r => r.name.toLowerCase().includes("mute"))[0];
    const roles = message.member!.roles;
    if (roles.includes(role.id)) {
        message.channel.createMessage(`${target.username} is already muted`);
        return;
    }
    client.addGuildMemberRole(message.guildID!, target.id, role!.id, reason)
        .then(() => message.channel.createMessage(`Muted ${target.username}`))
        .catch((err) => {
            message.channel.createMessage("An error occured. :(");
            console.error(err);
        });
})

client.on("ready", () => {
    console.log(`${client.user.username} started`);
})

client.connect();