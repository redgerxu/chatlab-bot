"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = __importDefault(require("eris"));
require("dotenv").config();
const client = new eris_1.default.CommandClient(process.env.token, {}, {
    prefix: "-"
});
client.registerCommand("ping", (message) => {
    message.channel.createMessage("Pong!");
}, {});
client.registerCommand("ban", (message, args) => {
    if (!(message.member.permission.json.ban))
        return;
    const target = message.mentions[0];
    let reason = args.join(" ");
    if (!reason.replace(/\s/g, '').length)
        reason = undefined;
    try {
        client.banGuildMember(message.guildID, target.id, 0, reason);
        message.channel.createMessage(`Banned ${target.username}`);
    }
    catch {
        message.channel.createMessage("An error occured. :(");
    }
}, {});
client.registerCommand("kick", (message, args) => {
    if (!(message.member.permission.json.kick))
        return;
    const target = message.mentions[0];
    let reason = args.join(" ");
    if (!reason.replace(/\s/g, '').length)
        reason = undefined;
    try {
        client.kickGuildMember(message.guildID, target.id, reason);
        message.channel.createMessage(`Kicked ${target.username}`);
    }
    catch {
        message.channel.createMessage("An error occured. :(");
    }
}, {});
client.on("ready", () => {
    console.log("started");
});
client.connect();
