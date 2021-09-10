module.exports = {
  name : 'kick',
  description : 'to kick someone',

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
      await message.channel.send(embed);
      return;
    }
    if(!args[0]){
      embed.setDescription("Please provide a user to kick from the server.")
        .setColor("RED");
      return;  
    }
    let person = personFinder(message, args[0]);
      if(person === "not found"){
        embed.setDescription("Wrong user provided or user doesn't exists in this server.")
          .setColor("RED");
      await message.channel.send(embed);
      return;
    } 
    if(isAdmin(person)){
      embed.setDescription("Sorry, but I can't kick them.")
        .setColor("RED");
      await message.channel.send(embed);  
      return;
    }
    let reason = messageEmojiFinder(client, message, args.slice(1));
    if(reason){
      reason = "Unspecified";
    }
    embed.setDescription(`You were kicked from **${message.guild.name}**.\nReason- \`${reason}\``)
      .setColor("RED");
    await person.send(embed).catch(console.error());
    await message.guild.members.cache.get(person.id).kick(reason).catch(console.error());
    embed.setDescription(`Successfully kicked ~~**__${person}__**~~.\nReason- \`${reason}\``)
      .setColor("GREEN");
    await message.channel.send(embed);
  }
}