const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearall")
    .setDescription("Clears all messages in a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const currentChannelMessages = await interaction.channel.messages.fetch();

    try {
      await interaction.deferReply();
      await interaction.channel.bulkDelete(currentChannelMessages);
      await interaction.editReply({
        content: `${interaction.user} deleted all messages in this channel.`,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply("Failed to delete messages.");
    }
  },
};
