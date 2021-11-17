module.exports = {
  name : 'clone',
  description : 'to clone a channel',
  
  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let channel = message.mentions.channels.first();
    if(!channel){
      channel = message.channel;
    }
    let embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let clonedChannel = await channel.clone().catch(async error => {
      embed.setDescription("Error cloning the channel.");
      await message.channel.send(embed).catch(error => {});
      return;
    });
    embed.setDescription(`Successfully cloned the channel ${message.channel} => ${clonedChannel}`)
      .setImage("https://i.ibb.co/4mRRszS/homer-simpson-guanchidoguan.gif")
      .setColor("GREEN");
    await message.channel.send(embed).catch(error => {});
  }
}