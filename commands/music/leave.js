const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { getVoiceConnections, getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder().setName("leave").setDescription("Leaves VC"),
  async execute(interaction, client) {
    const guildId = interaction.member.guild.id;

    const vc = getVoiceConnection(guildId);
    const queue = client.player.getQueue(interaction.guildId);

    queue.destroy();
    vc.destroy();

    interaction.reply("Fucking finally im free");
  },
};
