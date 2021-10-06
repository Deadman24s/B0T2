module.exports = {
  name: "unmute",
  description: "unmute the bad guy",
  
  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let person;
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      await message.react('❌').catch(err => {/*nothing*/});
      return;
    }
    if(!args[0]){
        embed.setDescription(`Command Usage-\n\`-unmute <member>\``)
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        return;
    }
    person = personFinder(message, args[0], "member");
    if(person === "not found"){
      embed.setDescription("Wrong user provided or user doesn't exists in this server.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      return;
    }
    let mutedRoleID = await database.get("mutedRoleID");
    if(!mutedRoleID){
      embed.setDescription("The muted role is not set please set it first.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      return;
    }
    let mutedRole = message.guild.roles.cache.get(mutedRoleID);
    if(!mutedRole){
      embed.setDescription("No mute role found with the ID provided.\nPlease set it again.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
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