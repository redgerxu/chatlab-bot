import { Message, MessageEmbed } from "discord.js";
import { commandName, randint, randprop } from "../resources/helper";
import { colors } from "../resources/colors";
import fetch from "node-fetch";
import { urls } from "../resources/apiURL";

module.exports = {
    name: commandName(__filename),
    description: "Gets a random post from https://reddit.com/r/ some subreddit",
    exec: async (message: Message, args: string[]): Promise<Message> => {
        const data = await fetch(`https://api.reddit.com/r/${args[0] || "memes"}/top.json?sort=top&t=day&limit=100`)
            .then(response => response.json())
            .then(response => response.data.children[randint(100)].data);
        const embed = new MessageEmbed()
            .setTitle(data.title)
            .setURL(urls.reddit + data.permalink)
            .setColor(randprop(colors))
            .setFooter(`👍${data.ups} 💬${data.num_comments}`);
        if (data.url.endsWith(".png") || data.url.endsWith(".jpeg") || data.url.endsWith(".jpg")) {
            embed.setImage(data.url);
        } else {
            return message.channel.send("There isn\'t a thumbnail for this post, still working on non-image posts, here\'s the link: " + data.url);
            // embed.addField(`From ${urls.reddit}/r/${args[0]}`, data.body);
        }
        return message.channel.send(embed);
    }
};