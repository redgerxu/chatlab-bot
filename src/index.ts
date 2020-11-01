import discord from "discord.js";
// import fs from "fs";
require("dotenv").config();
import load from "./helper";

const client = new discord.Client();
let commands = new Map();
commands = load();

client.on("message", (message: discord.Message) => {
    if (!message.content.startsWith("-") || !message.guild || message.author.bot) return;
    const command = message.content.split(" ")[0].slice(1);
    const args = message.content.split(" ").slice(1);
    try { 
        commands.get(command).execute(message, args);
    } catch (err) {
        console.log(err);
    }
})

client.on("ready", () => {
    console.log("started");
    console.table(commands);
})

client.login(process.env.token);