import fs from "fs";

const load = () => {
    const files = fs.readdirSync(__dirname + "/commands/").filter(file => file.endsWith(".ts"));
    let output = new Map();
    for (const file of files) {
        const command = require(`./commands/${file}`);
        output.set(command.name, command);
    }
    return output;
}

export default load;