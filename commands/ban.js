module.exports = {
  name : 'ban',
  description : 'to ban someone',

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
    let person = personFinder(message, args[0], "user");
    if(person === "not found"){
      embed.setDescription("Wrong user provided or user doesn't exists in this server.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    } 
    if((person.id == message.author.id) || isAdmin(person)){
      embed.setDescription("You can't ban them lol.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    if(person.bot){
      embed.setDescription("I can't ban my bot brother.")
        .setColor("RED");
      message.channel.send(embed);
      return;
    }
    let banReason,banDays;
    if(isNaN(args[1])){
      banReason = messageEmojiFinder(client, message, args.slice(1));
      banDays = "Forever";
    }
    else{
      banDays = args[1];
      banReason = messageEmojiFinder(client, message, args.slice(2));
    }
    if(!banReason){
      banReason = "Unspecified";
    }
    embed.setDescription(`You were banned from **${message.guild.name}**.\nReason- \`${banReason}\``)
      .setColor("RED");
    await person.send(embed).catch(console.error());
    if(isNaN(banDays)){
      await message.guild.members.cache.get(person.id).ban({reason: banReason }).catch();
    }else{
      await message.guild.members.cache.get(person.id).ban({days: banDays ,reason: banReason }).catch();
    }
    embed.setDescription(`Successfully banned ~~**__${person}__**~~.\nReason- \`${banReason}\`\nDuration- ${banDays} days.`)
      .setColor("GREEN");
    await message.channel.send(embed);
    }
}