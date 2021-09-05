module.exports = {
  name: "clear",
  description: "Clears messages",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder) {
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
    let amount = args.join(" ");
    if(!amount){
      embed.setDescription('please provide an amount of messages for me to delete.')
        .setColor("RED");
      await message.channel.send(embed);
      return;
    } 
    if(amount < 1){
      embed.setDescription(`you need to delete at least one message.`)
        .setColor("RED");
      await message.channel.send(embed);
      return;
    } 
    if(amount > 100){
      embed.setDescription(`Cannot delete more than 100 messages at a time.`)
        .setColor("RED");
      await message.channel.send(embed);
    } 
    await message.channel.messages.fetch({limit: amount}).then(messages => {
      message.channel.bulkDelete(messages)
    }).catch(er =>{
      embed.setDescription("Error while cleaning, maybe they are more than 14 days old.")
        .setColor("RED");
      message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete();}, 5000));
      return;
    });
    embed.setDescription(`Successfully removed ${amount} messages!`)
      .setColor("GREEN");
    await message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete();}, 5000));
  }
}