const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandsFolder = fs.readdirSync(`./commands/`);

    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());

        console.log(`Command ${command.data.name} is ready`);
      }
    }

    const clientId = "959872678884425768";
    const rest = new REST({ version: "10" }).setToken(process.env.token);

    try {
      console.log("Started refreshing application (/) commands.");

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandArray,
      });

      console.log("Successfully reloaded application (/) commands.");
      console.log(`Loaded ${client.commandArray.length} commands`);
    } catch (error) {
      console.error(error);
    }
  };
};
