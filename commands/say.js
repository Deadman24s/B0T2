module.exports = {
  name : 'say',
  description : 'to make the bot say a message',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM");
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
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
    await textChannel.send(msg).catch(error => {/*nothing*/});
    await message.delete().catch(error => {/*nothing*/});
  }
}