module.exports = {
  name : 'say',
  description : 'to make the bot say',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      react(message, '❌');
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
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    await textChannel.send(`${msg}`).catch(error => {/*nothing*/});
    await message.delete().catch(error => {});      
  }
}