const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
} = require("discord.js");
const ms = require("ms");
const logAction = require("../../src/utils/logAction");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Select a member and mute them.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to mute")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("How long the target should be muted for.")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
  async execute(interaction) {
    const member = interaction.options.getMember("target");
    const duration = interaction.options.getString("duration");
    const formattedDuration = ms(duration);
    const maxDuration = ms("28 days");

    try {
      if (formattedDuration > maxDuration) {
        await interaction.reply({
          content: "Duration of mute is too long.",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.deferReply({ ephemeral: true });
        await member.timeout(formattedDuration * 60000);
        await interaction.editReply({
          content: `✅ Success! User ${member} has been muted for ${formattedDuration} minute successfully.`,
          flags: MessageFlags.Ephemeral,
        });
        await logAction(interaction, "Mute", member);
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `❌ Failed to mute ${member}. Please check your permissions or the user's role hierarchy.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
