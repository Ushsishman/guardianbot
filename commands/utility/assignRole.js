const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("assign_role")
    .setDescription("Assign selected role to selected member.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to assign the role to")
        .setRequired(true),
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to assign to the user")
        .setRequired(true),
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    const selectedMember = interaction.options.getMember("member");
    const selectedRole = interaction.options.getRole("role");

    const assignEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("🏅 Role Assigned")
      .setDescription(
        `${selectedMember} has been granted the ${selectedRole.name} role.`,
      )
      .addFields(
        { name: "User", value: `<@${selectedMember.id}>`, inline: true },
        { name: "Role", value: `<@&${selectedRole.id}>`, inline: true },
        { name: "By", value: `<@${interaction.user.id}>`, inline: true },
      )
      .setTimestamp()
      .setFooter({ text: "Role Assignment Log" });

    try {
      await interaction.deferReply({ ephemeral: true });

      if (
        selectedMember.roles.cache.some(
          (role) => role.name === `${selectedRole.name}`,
        )
      ) {
        await interaction.editReply("Member already has this role !");
      } else {
        await selectedMember.roles.add(selectedRole);
        await interaction.editReply({ embeds: [assignEmbed] });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `❌ Failed to assign role.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
