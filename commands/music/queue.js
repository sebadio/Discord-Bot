const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getVoiceConnections, getVoiceConnection } = require("@discordjs/voice");
const { QueryType } = require("discord-player");
const { execute } = require("./play");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("displays the current song queue")
    .addNumberOption((option) =>
      option
        .setName("page")
        .setDescription("page number of the queue")
        .setMinValue(1)
    ),
  async execute(interaction, client) {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) {
      return await interaction.reply(
        "There are no songs in the queue you braindead"
      );
    }

    const totalPages = Math.ceil(queue.tracks.length / 10) || 1;

    const page = (interaction.options.getNumber("page") || 1) - 1;

    if (page > totalPages) {
      return await interaction.editReply(
        `You silly little shit, there are only ${totalPages} pages`
      );
    }

    const queueString = queue.tracks
      .slice(page * 10, page * 10 + 10)
      .map((song, i) => {
        return `**${page * 10 + i + 1}** -  ${song.title} \`[${
          song.duration
        }]\` - <@${song.requestedBy.id}>`;
      })
      .join("\n");

    const currentSong = queue.previousTracks[0];

    console.log(queue);

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Currently Playing")
          .setDescription(
            currentSong
              ? ` \`[${currentSong.duration}]\` ${currentSong.title} - Requested by: <@${currentSong.requestedBy.id}> \n\n**Queue**\n${queueString}`
              : "There is nothing playing"
          )
          .setFooter({
            text: `Page ${page + 1} out of ${totalPages}`,
          })
          .setThumbnail(currentSong.thumbnail)
          .setColor([120, 135, 176]),
      ],
    });
  },
};
