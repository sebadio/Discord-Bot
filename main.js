require("dotenv").config();
const { token } = process.env;
const { Client, Collection, TextChannel } = require("discord.js");
const fs = require("fs");
const { Player } = require("discord-player");

const client = new Client({ intents: 32767 });

client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

client.commands = new Collection();
client.commandArray = [];

const functionsFolder = fs.readdirSync("./functions");

for (const folder of functionsFolder) {
  const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}
client.login(token);

client.handleEvents();
client.handleCommands();

/* client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  message.channel.send("Sexo");
});
 */

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }

  const msg = await message.fetch();

  const { content } = await msg;

  if (content.toLowerCase().trim() === "buen bot") {
    message.channel.send("gracias pibe, toma un emoji");

    setTimeout(() => {
      message.react("❤");
    }, 1000);
  }

  if (content.toLowerCase().trim() === "bot malo") {
    message.channel.send("te limaste flaco, muy hater");

    setTimeout(() => {
      message.react("💢");
    }, 1000);
  }
});
