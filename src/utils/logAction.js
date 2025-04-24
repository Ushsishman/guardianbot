const { EmbedBuilder } = require("discord.js");

async function logAction(interaction, actionType, targetUser, reason) {
  const client = interaction.client;
  const channel = client.channels.cache.get(process.env.LOG_CHN_ID);

  const targetValue =
    targetUser !== null
      ? `${targetUser} - ${targetUser.id}`
      : "General Command";
  const embedTitle = targetUser !== null ? `User ${actionType}` : actionType;
  const embedReason = reason !== null ? `${reason}` : "No reason provided";

  const logEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`${embedTitle}`)
    .addFields(
      {
        name: "Target",
        value: `${targetValue}`,
      },
      { name: "Moderator", value: `${interaction.user}` },
      { name: "Reason", value: `${embedReason}` },
    )
    .setTimestamp();
  try {
    await channel.send({ embeds: [logEmbed] });
  } catch (error) {
    console.error(error);
  }
}

module.exports = logAction;
