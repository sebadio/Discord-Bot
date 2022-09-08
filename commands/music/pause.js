const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("za warudo! toki wo tomare!"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.reply("There is nothing to pause you dickhead");

    if (queue.connection.paused) {
      return await interaction.reply("Time is already stopped");
    }

    queue.setPaused(true);
    await interaction.reply("The World! Stop time!");
  },
};
