module.exports = {
  name : 'warns',
  description : "to check someone's warnings",

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
      await message.channel.send(embed).catch(error => {/*nothing*/});
      return;
    }
    let person, warnsCount, warnsText = "warning";
    person = personFinder(message, args[0], "user");
    if((person === "not found") || (!args[0])){
      person = message.author;
    }
    warnsCount = await database.get(`${person.id} warns`);
    if(!warnsCount){
      warnsCount = 0;
      await database.set(`${person.id} warns`, warnsCount);
    }
    if(warnsCount > 1)
      warnsText = warnsText + 's';
    if(args[0] == "help"){
      embed.setTitle("Warn Help")
        .setDescription(`
          **01** ~~»~~ __\`${prefix}warns help\`__- *To get this help message*.
          **02** ~~»~~ __\`${prefix}warns <user>\`__- *To check warns of a user*.
          **03** ~~»~~ __\`${prefix}warns clear <user>\`__- *To clear warns of a user*.
          **04** ~~»~~ __\`${prefix}warns set <user> <count>\`__- *To set warns of a user*.
        `);
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
    else if(args[0] == "clear"){
      person = personFinder(message, args[0], "user");
      if((person === "not found") || (!args[0])){
        person = message.author;
      }
      warnsCount = 0;
      if(warnsCount > 1)
        warnsText = warnsText + 's';
      await database.set(`${person.id}`, warnsCount);
      embed.setTitle(`${person.username}'s warnings`)
        .setDescription(`Successfully cleared their warnings.\nThey now have ${warnsCount} ${warnsText}.`)
        .setColor("GREEN");
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
    else if(args[0] == "set"){
      person = personFinder(message, args[0], "user");
      if((person === "not found") || (!args[0])){
        person = message.author;
      }
      if((!args[2]) || (isNaN(args[2]))){
        warnsCount = 0;
        if(warnsCount > 1)
          warnsText = warnsText + 's';
        await database.set(`${person.id}`, warnsCount);
        embed.setTitle(`${person.username}'s warnings`)
          .setDescription(`Successfully cleared their warnings.\nThey now have ${warnsCount} ${warnsText}.`)
          .setColor("GREEN");
        await message.channel.send(embed).catch(error => {/*nothing*/});
      }else{
        warnsCount = args[2] * 1;
        if(warnsCount > 1)
          warnsText = warnsText + 's';
        await database.set(`${person.id}`, warnsCount);
        embed.setTitle(`${person.username}'s warnings`)
          .setDescription(`Successfully updated their warnings.\nThey now have ${warnsCount} ${warnsText}.`)
            .setColor("GREEN");
        await message.channel.send(embed).catch(error => {/*nothing*/});
      }
    }
    else{
      embed.setTitle(`${person.username}'s warnings`)
        .setDescription(`${warnsCount} ${warnsText}.`);
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
  }
}