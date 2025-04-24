const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
} = require("discord.js");
const logAction = require("../../src/utils/logAction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Select a member and ban them.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to ban")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription(
          "Optional. Provide a reason for the action. This will be recorded in logs.",
        ),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason");

    try {
      await interaction.deferReply({ ephemeral: true });
      await interaction.guild.members.ban(user, { reason: reason });
      await interaction.editReply({
        content: `✅ Success! User ${user} has been banned from the server.`,
        flags: MessageFlags.Ephemeral,
      });
      await logAction(interaction, "Banned", user, reason);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `❌ Could not ban ${user}. Make sure I have the proper permissions and the user isn’t above me.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
