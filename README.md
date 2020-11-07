#**Chatlab Bot**\
Chatlab's Private Discord Bot

[Join the server!](https://discord.gg/J5VHMyz)

#How to Install (For your own server)

1. Download the code
    - Use either git clone https://github.com/narutopig/chatlab-bot in your desired directory
    **OR**
    - Download from the repo
2. Go to the directory
    - If you don't know how to do this, open up your terminal/command line app. (Powershell for Windows)
    - Type cd and then a space
    - Open up your file browser (Finder, File Explorer, etc.)
    - Find the folder with the downloaded code and drag the folder with the code into the terminal window.
    - Press enter
    - Type `yarn install` or `npm install`
3. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and press "New Application"
4. Go to "Bot" and click "Add bot"
5. Copy the token and create a new file in the root directory of the code (where package.json is) called .env and paste in\
`token=your token here`
6. Go to the "OAuth2" section and select the bot scope and then select the permissions you want the bot to have.
7. Copy the link and open in a new tab.
8. Invite to your server and do the captcha.
9. Open up the folder in the command line/terminal and type `yarn start` or `npm start` to start the bot
10. Enjoy the bot! (pls do it or else i will be big sad)