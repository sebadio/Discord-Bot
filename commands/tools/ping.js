const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns WaifuCollector's ping"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({ fetchReply: true });
    const newMessage = `**APi Latency**: ${
      client.ws.ping
    }ms\n**Client Ping**: ${
      message.createdTimestamp - interaction.createdTimestamp
    }ms`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
