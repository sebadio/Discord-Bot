const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { getVoiceConnections, getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder().setName("leave").setDescription("Leaves VC"),
  async execute(interaction, client) {
    interaction.reply("Leaving channel");

    const guildId = interaction.member.guild.id;

    const vc = getVoiceConnection(guildId);

    vc.destroy();
  },
};
