const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("shows what's currently playing"),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (queue) {
      const bar = queue.createProgressBar({
        queue: false,
        length: 19,
      });

      const song = queue.previousTracks[queue.previousTracks.length - 1];

      console.log(song);

      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Now Playing")
            .setColor([146, 217, 225])
            .setDescription(`Currently playing: [${song.title}]\n\n` + bar)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Song duration: ${song.duration}` }),
        ],
      });
    } else {
      await interaction.reply("Nothing is playing you dumbass");
    }
  },
};
