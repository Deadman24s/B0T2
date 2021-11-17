module.exports = {
  name : 'embed',
  description : 'to make the bot say message as an embed',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM");
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let textChannel;
    textChannel = message.mentions.channels.first();
    msg = messageEmojiFinder(client, message, args.slice(1));
    if(!textChannel){
      textChannel = message.channel;
      msg = messageEmojiFinder(client, message, args);
    }
    if(!msg){
      embed.setDescription("Write something bruh.")
        .setColor("RED")
        .setTimestamp(); 
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    if(msg.length >= 2000){
      msg.length = 1997;
      msg = msg + "...";
    }
    embed.setDescription(`${msg}`);
    await textChannel.send(embed).catch(error => {/*nothing*/});
    await message.delete().catch(error => {/*nothing*/});
  }
}