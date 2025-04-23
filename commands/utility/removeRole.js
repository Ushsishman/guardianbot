const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove_role")
    .setDescription("Remove selected role from selected member.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to remove the role to")
        .setRequired(true),
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to remove from user")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const selectedMember = interaction.options.getMember("member");
    const selectedRole = interaction.options.getRole("role");

    const assignEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("🗑️ Role Removed")
      .setDescription(
        `${selectedMember} has lost the ${selectedRole.name} role.`,
      )
      .addFields(
        { name: "User", value: `<@${selectedMember.id}>`, inline: true },
        { name: "Role", value: `<@&${selectedRole.id}>`, inline: true },
        { name: "By", value: `<@${interaction.user.id}>`, inline: true },
      )
      .setTimestamp()
      .setFooter({ text: "Role Removal Log" });

    try {
      await interaction.deferReply({ ephemeral: true });

      if (
        selectedMember.roles.cache.some(
          (role) => role.name === `${selectedRole.name}`,
        )
      ) {
        await selectedMember.roles.remove(selectedRole);
        await interaction.editReply({ embeds: [assignEmbed] });
      } else {
        await interaction.editReply("Member already doesn't have this role !");
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `❌ Failed to remove role.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
