async function logAction(interaction, actionType, targetUser) {
  const client = interaction.client;
  const channel = client.channels.cache.get(process.env.LOG_CHN_ID);

  let description = `${interaction.user} performed action: **${actionType}**.\n`;
  if (targetUser) {
    description += `Target: ${targetUser} (${targetUser.id})\n`;
  }

  await channel.send(description);
}

module.exports = logAction;
