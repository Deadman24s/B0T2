module.exports = {
  name : 'warn',
  description : 'to warn someone',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    }
    let person, warnReason = "Not Defined", muteTime = 120000, warnsCount, warnsText = "warning";
    if((!args[0]) || args[0] == "help"){
      embed.setTitle("Warn Help")
        .setDescription(`
          **01** ~~»~~ __\`${prefix}warn\`__- *To get this help message*.
          **02** ~~»~~ __\`${prefix}warn help\`__- *To get this help message*.
          **03** ~~»~~ __\`${prefix}warn <user>\`__- *To warn a user*.`);
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
    else{
      let person = personFinder(message, args[0], "member");
      if(person === "not found"){
        embed.setDescription("Wrong user provided or user doesn't exists in this server.")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.delete().catch(error => {});
        return;
      }  
      if((person.id == message.author.id) || person.bot || isAdmin(person) || person.id == "564106279862140938"){
        await message.channel.send("You can't warn them lol.").catch(error => {/*nothing*/});
        await message.delete().catch(error => {});
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
        .setDescription(`Reason- ${warnReason}.`)
        .setFooter(`${warnsCount} ${warnsText}`);
      await message.channel.send(embed).catch(error => {/*nothing*/});
      embed.setTitle(`You were warned`)
        .setDescription(`Reason- ${warnReason}.`)
        .setFooter(`${warnsCount} ${warnsText}`);
      await person.send(embed).catch(error => {/*nothing*/});
    }
    await message.delete().catch(error => {});
  }
}