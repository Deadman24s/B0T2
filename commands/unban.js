module.exports = {
  name : 'unban',
  description : 'to unban someone',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      return;
    }
    if(!isAdmin(message.guild.me)){
      embed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    if(!args[0]){
      embed.setDescription("No user ID provided.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    let userID = args[0];
    await message.guild.fetchBans().then(async bans=> {
      if(bans.size == 0){
        embed.setDescription("The bans list is empty.")
          .setColor("RED");
        await message.chanel.send(embed);
        return;
      }
      let bUser = bans.find(b => b.user.id == userID)
      if(!bUser){
        embed.setDescription("User not found in the banlist")
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }
      await message.guild.members.unban(bUser.user);
      embed.setDescription(`Successfully unbanned __${userID}__.`)
        .setColor("GREEN");
      await message.channel.send(embed);
      });
    }
}