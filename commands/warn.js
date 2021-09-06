module.exports = {
  name : 'warn',
  description : 'to warn someone',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
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
    let person, warnReason = "Not Defined", muteTime = 120000, warnsCount, warnsText = "warning";
    if((!args[0]) || args[0] == "help"){
      embed.setTitle("Warn Help")
        .setDescription(`
          **01** ~~»~~ __\`${prefix}warn\`__- *To get this help message*.
          **02** ~~»~~ __\`${prefix}warn help\`__- *To get this help message*.
          **03** ~~»~~ __\`${prefix}warn <user>\`__- *To warn a user*.`);
      await message.channel.send(embed);
    }
    else{
      let person = personFinder(message, args[0]);
      if(person === "not found"){
        embed.setDescription("Wrong user provided or user doesn't exists in this server.")
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }  
      if((person.id == message.author.id) || person.bot || isAdmin(person)){
        await message.channel.send("You can't warn them lol.");
        return;
      }
      warnsCount = await database.get(`${person.id} warns`);
      if((!warnsCount) || (warnsCount < 0)){
        warnsCount = 0;
        await database.set(`${person.id} warns`, warnsCount);
      }
      if(args[1]){
        warnReason = args.slice(1).join(" ");
      }
      warnsCount++;
      if(warnsCount > 1)
        warnsText = warnsText + 's';
      await database.set(`${person.id} warns`, warnsCount);
      embed.setTitle(`${person.user.username} was warned`)
        .setDescription(`Reason- \`${warnReason}\`.`)
        .setFooter(`${warnsCount} ${warnsText}`);
      await message.channel.send(embed);
      embed.setTitle(`You were warned`)
        .setDescription(`Reason- \`${warnReason}\`.`)
        .setFooter(`${warnsCount} ${warnsText}`);
      await person.send(embed).catch(console.log(`Couldn't DM ${person.user.username}.`));
    }
  }
}