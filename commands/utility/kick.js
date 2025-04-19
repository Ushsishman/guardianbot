const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
} = require("discord.js");
const logAction = require("../../src/utils/logAction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Select a member and kick them.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to kick")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const member = interaction.options.getMember("target");

    try {
      await interaction.deferReply({ ephemeral: true });
      await member.kick();
      await interaction.editReply({
        content: `✅ Success! User ${member} has been kicked from the server.`,
        flags: MessageFlags.Ephemeral,
      });
      await logAction(interaction, "Kick", member);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `❌ Failed to kick ${member}. I might lack the necessary permissions or the user’s role is higher.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
