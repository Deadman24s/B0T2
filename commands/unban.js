module.exports = {
  name : 'unban',
  description : 'to unban someone',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    }
    if(!args[0]){
      embed.setDescription("No user ID provided.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    }
    let userID = args[0];
    await message.guild.fetchBans().then(async bans=> {
      if(bans.size == 0){
        embed.setDescription("The bans list is empty.")
          .setColor("RED");
        await message.chanel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        await message.react('❌');
        return;
      }
      let bUser = bans.find(b => b.user.id == userID)
      if(!bUser){
        embed.setDescription("User not found in the banlist")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        await message.react('❌');
        return;
      }
      await message.guild.members.unban(bUser.user);
      embed.setDescription(`Successfully unbanned __${userID}__.`)
        .setColor("GREEN");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      });
    }
}