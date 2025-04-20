const { EmbedBuilder } = require("discord.js");

async function logAction(interaction, actionType, targetUser) {
  const client = interaction.client;
  const channel = client.channels.cache.get(process.env.LOG_CHN_ID);

  const targetValue =
    targetUser !== null
      ? `${targetUser} - ${targetUser.id}`
      : "General Command";
  const embedTitle = targetUser !== null ? `User ${actionType}` : actionType;

  const logEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`${embedTitle}`)
    .addFields(
      {
        name: "Target",
        value: `${targetValue}`,
      },
      { name: "Moderator", value: `${interaction.user}` },
    )
    .setTimestamp();

  await channel.send({ embeds: [logEmbed] });
}

module.exports = logAction;
