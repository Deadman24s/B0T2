module.exports = {
  name: "clear",
  description: "Clears messages",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder) {
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
    let amount = args[0];
    if((!amount) || isNaN(amount)){
      embed.setDescription('please provide an amount of messages for me to delete.')
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      return;
    } 
    if(amount < 1){
      embed.setDescription(`You need to delete at least one message.`)
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      return;
    } 
    if(amount > 100){
      embed.setDescription(`Cannot delete more than 100 messages at a time.`)
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
    } 
    embed.setDescription(`Removing ${amount} messages!`)
      .setColor("GREEN");
    await message.channel.messages.fetch({limit: amount}).then(async messages => {
      message.channel.bulkDelete(messages).catch(async er => {
        embed.setDescription("Error while cleaning, maybe they are more than 14 days old.")
          .setColor("RED");
        await message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 5000)).catch(error => {/*nothing*/});
        await message.delete().catch(error => {/*nothing*/});
        return;
      })
      await message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 5000)).catch(error => {/*nothing*/});
      await message.delete().catch(error => {/*nothing*/});
    });
  }
}