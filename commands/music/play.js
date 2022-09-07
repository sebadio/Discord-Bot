const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getVoiceConnections, getVoiceConnection } = require("@discordjs/voice");

const ytdl = require("ytdl-core");

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

    let embed = new EmbedBuilder()
      .setDescription(`Searching for song: ${song}`)
      .setTitle("Loading Song...");

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`**Searching for song:** ${song}`)
          .setTitle("Loading Song...")
          .setAuthor({
            name: client.user.tag,
            iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.webp`,
          })
          .setColor("Aqua"),
      ],
    });

    /*     if (!interaction.member.voice.channel)
      return interaction.editReply(
        "You need to be in a VC to play music.\nIdiot."
      );

    const queue = await client.player.createQueue(interaction.guild);

    if (!queue.connection) {
      await queue.connect(interaction.member.voice.channel);
    } */
  },
};
