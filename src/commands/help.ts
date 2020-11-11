import { Message } from "discord.js";
import { commandName } from "../resources/helper";

module.exports = {
    name: commandName(__filename),
    exec: (message: Message): void => {
        message.channel.send(This is the help menu. Here is the list of all current commands:

All commands need a period (-) before them to function, For example, .mute or .user.

ban - Bans a user from the server. If they are sent an invite, they cannot rejoin. 
ban usage: -ban @user#0000 <reason>

hypixel - Shows the Hypixel statistics of a Minecraft playyer.
hypixel usage: -hypixel <Minecraft Username>

kick - Kicks a user out of the server. They can rejoin with an invite.
kick usage: -kick @user#0000

mute - Mutes a user. They cannot speak in any text channel until unmuted. They can still 
talk in voice channels, though.
mute usage: -mute @user#0000

ping - Shows the ping of the bot
ping usage: -ping

unmute - Unmutes a user so they can speak in voice channels again.
unmute usage: -unmute @user#0000

user - Shows information about a user in the server.
user usage: -user @user#0000!"(;)
    }
};
