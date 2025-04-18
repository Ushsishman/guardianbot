const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
} = require("discord.js");

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
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("target");

    try {
      await interaction.deferReply({ ephemeral: true });
      await interaction.guild.members.ban(user);
      await interaction.editReply({
        content: `✅ Success! User ${user} has been banned from the server.`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `❌ Could not ban ${user}. Make sure I have the proper permissions and the user isn’t above me.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
