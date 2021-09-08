module.exports = {
  name : 'say',
  description : 'to make the bot say',

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
    let msg;
    let textChannel = message.mentions.channels.first();
    if(textChannel) {
      msg = messageEmojiFinder(client, message, args.slice(1));
    }else{
      msg = messageEmojiFinder(client, message, args);
      textChannel = message.channel;
    }
    if(!msg){
      embed.setDescription("Write something bruh.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    await textChannel.send(`${msg}`);
    await message.delete();      
  }
}