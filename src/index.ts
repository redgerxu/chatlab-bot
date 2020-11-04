import Eris from "eris";
import * as dotenv from "dotenv";
dotenv.config();

const client = new Eris.CommandClient(process.env.token! ,{},{
    prefix: process.env.prefix!
});

client.registerCommand("ping", (message: Eris.Message):void => {
    message.channel.createMessage("Pong!");
}, {});

client.registerCommand("ban", (message: Eris.Message, args: string[]): void => {
    if (!message.member!.permission.json.banMembers) return;
    const target = message.mentions[0];
    if (target.id == message.author.id) {
        message.channel.createMessage("You can\'t ban yourself!");
        return;
    }
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
    if (target.id == message.author.id) {
        message.channel.createMessage("You can\'t kick yourself!");
        return;
    }
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
    if (target.id == message.author.id) {
        message.channel.createMessage("You can\'t mute yourself!");
        return;
    }
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

client.registerCommand("unmute", (message: Eris.Message, args: string[]): void => {
    if (!(message.member!.permission.json.manageMessages)) return;
    const target = message.mentions[0];
    let reason: string | undefined = args.join(" ");
    if (!reason.replace(/\s/g, '').length) reason = undefined;
    const role = message.member!.guild.roles.filter(r => r.name.toLowerCase().includes("mute"))[0];
    const roles = message.member!.roles;
    if (!roles.includes(role.id)) {
        message.channel.createMessage(`${target.username} is not muted`);
        return;
    }
    client.removeGuildMemberRole(message.guildID!, target.id, role!.id, reason)
        .then(() => message.channel.createMessage(`Unuted ${target.username}`))
        .catch((err) => {
            message.channel.createMessage("An error occured. :(");
            console.error(err);
        });
})

client.on("ready", () => {
    console.log(`${client.user.username} started`);
    client.editStatus("online", {name: "over Chatlab", type: 3});
})

client.connect();