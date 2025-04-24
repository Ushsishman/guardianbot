const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member, client) {
    const channel = client.channels.cache.get(process.env.WELCOME_CHN_ID);
    const welcomeEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`🎉 Welcome to ${member.guild.name}! 🎉`)
      .setDescription(
        `Hey <@${member.id}> (${member.user.tag}), glad to have you here!`,
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    try {
      await channel.send({ embeds: [welcomeEmbed] });
      await member.roles.add(`${process.env.DEF_ROLE_ID}`);
    } catch (error) {
      console.error(error);
    }
  },
};
