module.exports = {
  name: "swear",
  description: "to add or remove swears",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react) {
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    }
    var swears = await database.get("swearsList");
    var swearsList = [];
    if(swears)
      swearsList = await swears.split(" ");
    if(args[1])
      args[1] = args[1].toLowerCase();
    if(!args[0]){
      embed.setDescription(`What do you want to do?\nUse \`${prefix}swear help\`.`)
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    }
    else if(args[0] == "help"){
      embed.setDescription(`
        **Swear Help**\n
        **01** ~~»~~ __\`${prefix}swear add <word>\`__- *To add a word in swearlist*.
        **02** ~~»~~ __\`${prefix}swear remove <word>\`__- *To remove a word from swearlist*.
        **03** ~~»~~ __\`${prefix}swear view\`__- *To view the swearlist*.
        **04** ~~»~~ __\`${prefix}swear clear\`__- *To clear the swearlist*.`);
      await message.channel.send(embed).catch(error => {/*nothing*/});  
    }
    else if(args[0].toLowerCase() == 'add'){
      if(!args[1]){
        embed.setDescription("Please provide a word to add in the swear list")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        await message.react('❌');
        return;
      }
      for(let i=0; i<=swearsList.length-1; i++){
        if(args[1] == swearsList[i]){
          embed.setDescription("The word is already present in the database.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
          await message.delete().catch(error => {/*nothing*/});
          return;
        }
      }
      swearsList[swearsList.length] = args[1];
      await database.set("swearsList", swearsList.join(" "));
      embed.setDescription(`Successfully added ||${swearsList[swearsList.length-1]}|| into the swearlist.`)
        .setColor("GREEN");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.delete().catch(error => {/*nothing*/});
    }
    else if(args[0].toLowerCase() == 'remove'){
      let pos = -1, word;
      if(!args[1]){
        embed.setDescription("Please provide a word to remove from the swear list")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        await message.react('❌');
        return;
      }
      for(let i=0; i<=swearsList.length-1; i++){
        if(args[1] == swearsList[i]){
          word = swearsList[i];
          pos = i;
          break;
        }
      }
      if(pos == -1){
        embed.setDescription(`The word ||${args[1]}|| is not present in the database.`)
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        await message.react('❌');
        return;
      }
      for(let i = pos; i <= swearsList.length-1; i++){
        swearsList[i] = swearsList[i+1];
      }
      swearsList.pop();
      await database.set("swearsList", swearsList.join(" "));
      embed.setDescription(`Successfully removed ||${word}|| from the swearlist.`)
        .setColor("GREEN");
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
    else if(args[0].toLowerCase() == 'view' || args[0].toLowerCase() == 'list'){
      if(swearsList.length <= 0){
        embed.setDescription("The swear list is empty.")
          .setColor("RED");
        await message.reactions.removeAll();
        await message.react('❌');
      }
      else{
        embed.setDescription(`Swear list-\n\`${swearsList}\``);
      }
      await message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 10000)).catch(error => {/*nothing*/});
    }
    else if(args[0].toLowerCase() == 'clear'){
      if(swearsList.length <= 0){
        embed.setDescription("The swear list is already empty.")
          .setColor("RED");
        await message.reactions.removeAll();
        await message.react('❌');
      }
      else{
        await database.set("swearsList", null);
        embed.setDescription("Sucessfully cleared the database.")
          .setColor("GREEN");
      }
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
  }
}