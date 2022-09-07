const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("pingpong").setDescription("Ping?"),
  async execute(interaction, client) {
    interaction.reply("Pong!");
  },
};
