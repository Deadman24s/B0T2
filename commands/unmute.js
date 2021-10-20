module.exports = {
  name: "unmute",
  description: "unmute the bad guy",
  
  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let person;
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    }
    if(!args[0]){
        embed.setDescription(`Command Usage-\n\`-unmute <member>\``)
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        await message.react('❌');
        return;
    }
    person = personFinder(message, args[0], "member");
    if(person === "not found"){
      embed.setDescription("Wrong user provided or user doesn't exists in this server.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    }
    let mutedRoleID = await database.get("mutedRoleID");
    if(!mutedRoleID){
      embed.setDescription("The muted role is not set please set it first.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    }
    let mutedRole = message.guild.roles.cache.get(mutedRoleID);
    if(!mutedRole){
      embed.setDescription("No mute role found with the ID provided.\nPlease set it again.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      await message.react('❌');
      return;   
    }
    if(person.roles.cache.has(mutedRoleID)){
      person.roles.remove(mutedRoleID);
      embed.setDescription(`Sucessfully unmuted ${person}.`)
        .setColor("GREEN");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      embed.setDescription(`You were unmuted.`)
        .setColor("GREEN");
      await person.send(embed).catch(error => {/*nothing*/});
    }else{
      embed.setDescription(`${person} is not muted.`)
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
  }
}