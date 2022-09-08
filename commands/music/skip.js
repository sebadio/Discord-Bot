const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("skips current song"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    const currentSong = queue.previousTracks[queue.previousTracks.length - 1];

    queue.skip();

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Some GT skipped a song")
          .setDescription(`**${currentSong}** was skipped`)
          .setThumbnail(currentSong.thumbnail),
      ],
    });
  },
};
