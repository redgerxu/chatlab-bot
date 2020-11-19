import {
    readdirSync
} from "fs";
export let commands = new Map();

// commmand loading
const files = readdirSync(__dirname + "/../commands/").filter(file => file.endsWith(".ts"));
for (const file of files) {
    const command = require(`../commands/${file}`);
    commands.set(command.name, command);
}