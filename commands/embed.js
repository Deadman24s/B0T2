module.exports = {
  name : 'embed',
  description : 'to make the bot say mesage as an embed',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor("RANDOM")
      .setTimestamp();
    let errorEmbed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTimestamp(); 
    if(!isAdmin(message.member)){
      return;
    }
    if(!isAdmin(message.guild.me)){
      errorEmbed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.");
      await message.channel.send(embed);
      return;
    }
    let msg;
    let textChannel = message.mentions.channels.first()
    if(textChannel){
      msg = messageEmojiFinder(client, message, args.slice(1));
      if(!msg){
        errorEmbed.setDescription("Write something bruh.");
        await message.channel.send(errorEmbed);
        return;
      }
      embed.setDescription(`${msg}`);
      await textChannel.send(embed);
    }
    else{
      msg = messageEmojiFinder(client, message, args);
      if(!msg){
        errorEmbed.setDescription("Write something bruh.");
        await message.channel.send(errorEmbed);
        return;
      }
      embed.setDescription(`${msg}`);
      await message.channel.send(embed);
    }  
    await message.delete();
  }
}