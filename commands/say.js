module.exports = {
  name : 'say',
  description : 'to make the bot say',

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
      await message.channel.send(embed).catch(error => {/*nothing*/});
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
      await message.channel.send(embed).catch(error => {/*nothing*/});
      return;
    }
    await textChannel.send(`${msg}`).catch(error => {/*nothing*/});
    await message.delete();      
  }
}