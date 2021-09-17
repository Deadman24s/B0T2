module.exports = {
  name : 'emojis',
  description : 'member count of the server',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
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
    let i, j;
    let guildsNamesMap = client.guilds.cache
      .sort((a, b) => b.position - a.position)
      .map(g => g)
      .join(",");
    let guildsIDsMap = client.guilds.cache
      .sort((a, b) => b.position - a.position)
      .map(g => g.id)
      .join(" ");
    let guildsNames = guildsNamesMap.split(",");
    let guildsIDs = guildsIDsMap.split(/ +/);
    for(i=0; i<guildsNames.length; i++){
      let guild = client.guilds.cache.get(guildsIDs[i]);
      let emojisMap = guild.emojis.cache
        .sort((a, b) => b.position - a.position)
        .map(e => e)
        .join(",");
      let emojisNamesMap = guild.emojis.cache
        .sort((a, b) => b.position - a.position)
        .map(e => e.name)
        .join(","); 
      let emojis = emojisMap.split(",");
      let emojisNames = emojisNamesMap.split(",");  
      embed.setDescription("Sending you the list of all emojis bot has access to.");
      await message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 5000)).catch(error => {/*nothing*/});
      await message.author.send(emojis[j] + " => " + emojisNames[j]).catch(async err =>{
        embed.setDescription("Either your DMs are off or I'm blocked.")  
          .setColor("RED");
        await message.reply(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 5000)).catch(error => {/*nothing*/});
        return; 
      });
      for(j=1; j <= emojis.length-1; j++){
        await message.author.send(emojis[j] + " => " + emojisNames[j]).catch(error => {/*nothing DMS are off or blocked*/});
      }
    }
    await message.delete().catch(error => {/*nothing*/});
  }
}