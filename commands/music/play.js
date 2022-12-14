const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("plays song")
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("song that you want the bot to play")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const song = interaction.options.getString("song");

    if (!interaction.member.voice.channel) {
      return await interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `You need to be in a Voice Channel for me to play music`
            )
            .setTitle("Idiot")
            .setAuthor({
              name: client.user.tag,
              iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp`,
            })
            .setColor("Aqua"),
        ],
      });
    } else {
      const queue = await client.player.createQueue(interaction.guild);
      if (!queue.connection) {
        await queue.connect(interaction.member.voice.channel);
      }

      let embed = new EmbedBuilder();

      let songType = "";

      if (song.includes("https://")) {
        if (
          song.includes("&list=") ||
          song.includes("?list=") ||
          song.includes("/playlist")
        ) {
          songType = "playlist";
        } else {
        }
      } else {
        songType = "song";
      }

      if (songType === "url") {
        const result = await client.player.search(song, {
          requestedBy: interaction.user,
          searchEngine: QueryType.YOUTUBE_VIDEO,
        });

        if (result.tracks.length === 0) {
          embed.setTitle("You fucking monkey");
          embed.setDescription("There was no result for that request you made");
          embed.setFooter({ text: "for fuck's sake" });
        }

        const music = result.tracks[0];
        await queue.addTrack(music);

        embed.setTitle("Succesfully added requested song");
        embed.setDescription(
          `Added **${music.title}** to the Queue\n${music.url}`
        );
        embed.setThumbnail(music.thumbnail);
        embed.setFooter({ text: `${music.duration}` });
      } else if (songType === "playlist") {
        const result = await client.player.search(song, {
          requestedBy: interaction.user,
          searchEngine: QueryType.YOUTUBE_PLAYLIST,
        });

        if (result.tracks.length === 0) {
          embed.setTitle("You fucking monkey");
          embed.setDescription("There was no result for that request you made");
          embed.setFooter({ text: "for fuck's sake" });
        }

        const playlist = result.playlist;
        await queue.addTracks(result.tracks);

        embed.setTitle(
          `Succesfully added **${
            playlist.title ? playlist.title : "Your playlist"
          }** (${result.tracks.length} tracks) to the queue`
        );
        embed.setDescription(
          `Added **${
            playlist.title ? playlist.title : "Your playlist"
          }** to the Queue\n${playlist.url} `
        );
        embed.setThumbnail(playlist.thumbnail.url);
      } else if (songType === "song") {
        const result = await client.player.search(song, {
          requestedBy: interaction.user,
          searchEngine: QueryType.YOUTUBE_SEARCH,
        });

        if (result.tracks.length === 0) {
          embed.setTitle("You fucking monkey");
          embed.setDescription("There was no result for that request you made");
          embed.setFooter({ text: "for fuck's sake" });
        }

        const music = result.tracks[0];
        await queue.addTrack(music);

        embed.setTitle("Succesfully added requested song");
        embed.setDescription(
          `Added **${music.title}** to the Queue\n${music.url} `
        );
        embed.setThumbnail(music.thumbnail);
        embed.setFooter({ text: `${music.duration}` });
      }

      if (!queue.playing) await queue.play();

      embed.setColor([146, 217, 225]);
      return interaction.reply({ embeds: [embed] });
    }
  },
};
