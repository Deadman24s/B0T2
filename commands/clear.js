module.exports = {
  name: "clear",
  description: "Clears messages",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react) {
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let amount = args[0];
    if((!amount) || isNaN(amount)){
      embed.setDescription('please provide an amount of messages for me to delete.')
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    } 
    if(amount < 1){
      embed.setDescription(`You need to delete at least one message.`)
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    } 
    if(amount > 100){
      embed.setDescription(`Cannot delete more than 100 messages at a time.`)
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
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