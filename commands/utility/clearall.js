const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const logAction = require("../../src/utils/logAction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearall")
    .setDescription("Clears all messages in a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const currentChannelMessages = await interaction.channel.messages.fetch({
      limit: 100,
    });

    try {
      await interaction.deferReply();
      await interaction.channel.bulkDelete(currentChannelMessages);
      await interaction.editReply({
        content: `${interaction.user} deleted all messages in this channel.`,
      });
      await logAction(interaction, "Clear Chat", null);
    } catch (error) {
      console.error(error);
      await interaction.reply("Failed to delete messages.");
    }
  },
};
