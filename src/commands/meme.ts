import { Message, MessageEmbed } from "discord.js";
import { commandName, randint, randprop } from "../resources/helper";
import { colors } from "../resources/colors";
import fetch from "node-fetch";
import { urls } from "../resources/apiURL";

module.exports = {
    name: commandName(__filename),
    description: "Gets a random meme from https://reddit.com/r/memes",
    exec: async (message: Message): Promise<Message> => {
        const data = await fetch("https://api.reddit.com/r/memes/top.json?sort=top&t=day&limit=100")
            .then(response => response.json())
            .then(response => response.data.children[randint(100)].data);
        const embed = new MessageEmbed()
            .setTitle(data.title)
            .setURL(urls.reddit + data.permalink)
            .setColor(randprop(colors))
            .setFooter(`👍${data.ups}`)
            .setImage(data.url);
        return message.channel.send(embed);
    }
};