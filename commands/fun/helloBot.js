const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("react").setDescription("reacts"),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: "Que andas collector?",
      fetchReply: true,
    });
    message.react("😄");
    const channelId = client.channels.cache.get(interaction.channelId);

    channelId.send("Por aca todo piola");
  },
};
