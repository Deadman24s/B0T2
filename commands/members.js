module.exports = {
  name : 'members',
  description : 'member count of the server',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      return;
    }
    if(!isAdmin(message.guild.me)){
      errorEmbed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.");
      await message.channel.send(embed);
      return;
    }
    let membersMap = message.guild.members.cache
      .sort((a, b) => b.position - a.position)
      .map(r => r)
      .join("\n");
    if (membersMap.length > 1024) membersMap = "Too many members to display";
    if (!membersMap) membersMap = "No members";
    embed.setDescription(`
      **Total Users**: __${message.guild.memberCount}__\n
      **Members**: __${message.guild.members.cache.filter(m => !m.user.bot).size}__\n
      **Bots**: __${message.guild.members.cache.filter(m => m.user.bot).size}__`);
    await message.channel.send(embed);       
    embed.setDescription(membersMap);    
    await message.channel.send(embed);
    }
}