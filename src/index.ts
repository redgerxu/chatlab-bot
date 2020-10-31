import { Client } from "discord.js";
// import fs from "fs";
require("dotenv").config();
import load from "./helper";

const client = new Client();
let commands = new Map();
commands = load();

client.on("start", () => {
    console.log('history');
})

client.login(process.env.token);