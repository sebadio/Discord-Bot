require("dotenv").config();
const { token } = process.env;
const { Client, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: 32767 });

// client.on("ready", () => {});

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
