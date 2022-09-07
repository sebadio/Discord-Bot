const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Joins VC")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("channel you want the bot to join")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice)
    ),
  async execute(interaction, client) {
    interaction.reply("Entering channel...");
    const vc = interaction.options.getChannel("channel");
    const voiceConection = joinVoiceChannel({
      channelId: vc.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });
  },
};
