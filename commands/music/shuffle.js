const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("shuffles current playlist"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (queue) {
      queue.shuffle();
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Shuffled songs")
            .setColor([146, 217, 225])
            .setDescription(`Shuffled ${queue.tracks.length}`),
        ],
      });
    } else {
      await interaction.reply("Nothing to shuffle you moron");
    }
  },
};
