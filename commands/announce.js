module.exports = {
  name : 'announce',
  description : 'to make an announcement',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      await message.react('❌').catch(err => {/*nothing*/});
      return;
    }
    if(!isAdmin(message.guild.me)){
      await message.reactions.removeAll();
      await message.react('❌').catch(err => {/*nothing*/});
      embed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    let announcementChannelID = await database.get("announcementChannelID");
    if(!announcementChannelID){
      embed.setDescription("The announcement channel is not set.")
        .setColor("RED");
      await message.reply(embed);
      return;
    } 
    let announcementChannel = message.guild.channels.cache.get(announcementChannelID);
    if(!announcementChannel){
      embed.setDescription("The announcement channel is not present.")
        .setColor("RED");
      await message.reply(embed);
      return;
    }
    if(!args[0]){
      embed.setDescription("Please provide a message to announce.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    let pingRoleID = await database.get("pingRoleID");
    if(!pingRoleID){
      pingRoleID = "undefined";
    }
    let pingRole = message.guild.roles.cache.get(pingRoleID);
    let announcement = messageEmojiFinder(client, message, args);
    embed.setAuthor(message.guild.name, message.guild.iconURL())
      .setTitle("**Announcement**")
      .setDescription(`${announcement}`)
      .setFooter(`By- ${message.author.username}`);
    await announcementChannel.send(embed);
    if(pingRole){
      await announcementChannel.send(`${pingRole}`).then((msg) => setTimeout(function(){msg.delete();}, 500));  
    }
    let e = new Discord.MessageEmbed()
      .setDescription("Successfully Announced you message.")
      .setColor("GREEN");
    await message.channel.send(e);
  }
}