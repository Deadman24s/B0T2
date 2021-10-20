module.exports = {
  name: "mute",
  description: "mute the bad guy",

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let time, t = "undefined", type, person, reason;
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    if(!args[0]){
      embed.setDescription(`Command Usage-\n\`-mute <member> <time>\`\n(time formats- s, min, h, d, m)`)
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    person = personFinder(message, args[0], "member");
    if(person === "not found"){
      embed.setDescription("Wrong user provided or user doesn't exists in this server.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    if(isAdmin(person) || person.id == "564106279862140938"){
      embed.setDescription("I can't mute them or they'll ban me. :fearful:")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let mutedRoleID = await database.get("mutedRoleID");
    if(!mutedRoleID){
      embed.setDescription("The muted role is not set please set it first.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let mutedRole = message.guild.roles.cache.get(mutedRoleID);
    if(!mutedRole){
      embed.setDescription("No mute role found with the ID provided.\nPlease set it again.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;   
    }
    if(person.roles.cache.has(mutedRoleID)){
      embed.setDescription(`${person} is already muted.`)
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
    }else{
      person.roles.add(mutedRoleID);
      reason = messageEmojiFinder(client, message, args.slice(1));
      if(args[1] && args[1].match(/^\d/)){
        reason = messageEmojiFinder(client, message, args.slice(2));
        if(args[1].endsWith('s')){
          time = args[1].replace(/[a-zA-Z]+/,'');
          type = 'second';
          if(!(isNaN(time))){
            if(time > 1){
              type = type + 's';
            }
            t = time * 1000;
          }
        }
        else if(args[1].endsWith('min')){
          time = args[1].replace(/[a-zA-Z]+/,'');
          type = 'minute';
          if(!(isNaN(time))){
            if(time > 1){
              type = type + 's';
            }
            t = time * 60000;
          }
        }
        else if(args[1].endsWith('h')){
          time = args[1].replace(/[a-zA-Z]+/,'');
          type = 'hour';
          if(!(isNaN(time))){
            if(time > 1){
              type = type + 's';
            }
            t = time * 3600000;
          }
        }
        else if(args[1].endsWith('d')){
          time = args[1].replace(/[a-zA-Z]+/,'');
          type = 'day';
          if(!(isNaN(time))){
            if(time > 1){
              type = type + 's';
            }
            t = time * 86400000;
          }
        }
        else if(args[1].endsWith('m')){
          time = args[1].replace(/[a-zA-Z]+/,'');
          type = 'month';
          if(!(isNaN(time))){
            if(time > 1){
              type = type + 's';
            }
            t = time * 2592000000;
          }
        }
      }
      if(!reason){
        reason = "Not Provided";
      }
      if(t == "undefined"){
        embed.setDescription(`Successfully muted ${person} for \`forever\`.\n**Reason**- ${reason}`)
          .setColor("GREEN");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        embed.setDescription(`You were muted in the server for \`forever\`.\nReason- ${reason}`)
          .setColor("RED");
        await person.send(embed).catch(error => {/*nothing DMS are off or blocked*/});
      }else{
        embed.setDescription(`Successfully muted ${person} for \`${time} ${type}\`.\nReason- ${reason}`)
          .setColor("GREEN");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        embed.setDescription(`You were muted in the server for \`${time} ${type}\`.\nReason- ${reason}`)
          .setColor("RED");
        await person.send(embed).catch(error => {/*nothing DMS are off or blocked*/});
        setTimeout(async function(){
          if(person.roles.cache.has(mutedRoleID)){
            person.roles.remove(mutedRoleID);
            embed.setDescription(`You were unmuted.`)
              .setColor("GREEN");
            await person.send(embed).catch(error => {/*nothing DMS are off or blocked*/});
          }
        }, t);
      }
    }
  }
}