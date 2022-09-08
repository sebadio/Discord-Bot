const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("change the volume of my voice")
    .addNumberOption((option) =>
      option
        .setName("volume")
        .setDescription("volume that you want to hear my voice")
        .setRequired(true)
        .setMaxValue(100)
        .setMinValue(1)
    ),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return interaction.reply(
        "There is nothing playing rn so no need to change my voice"
      );

    queue.setVolume(interaction.options.getNumber("volume"));

    await interaction.reply(
      `My new volume is ${interaction.options.getNumber("volume")}`
    );
  },
};
