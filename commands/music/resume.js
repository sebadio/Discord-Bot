const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("toki wa ugoki dasu..."),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.reply("There is nothing to resume you dickhead");

    if (!queue.connection.paused) {
      return await interaction.reply("Time is already flowing normally");
    }

    queue.setPaused(false);
    await interaction.reply("Time has begun to move again...");
  },
};
