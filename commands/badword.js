module.exports = {
  name: "badword",
  description: "to add or remove badwords",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
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
    let badwords = await database.get("badwordsList");
    let badwordsList = [];
    if(badwords)
      badwordsList = await badwords.split(" ");
    if(!args[0]){
      embed.setDescription(`What do you want to do?\nUse \`${prefix}badword help\`.`)
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      return;
    }else{
      if(!args[1]){
        if(args[0] == "help"){
          embed.setDescription(`
            **Badword Help**\n
            **01** ~~»~~ __\`${prefix}badword add <word>\`__- *To add a word in badwords list*.
            **02** ~~»~~ __\`${prefix}badword remove <word>\`__- *To remove a word from badwords list*.
            **03** ~~»~~ __\`${prefix}badword view\`__- *To view the badwords list*.
            **04** ~~»~~ __\`${prefix}badword clear\`__- *To clear the badwords list*.`);
          await message.channel.send(embed).catch(error => {/*nothing*/});  
        }
        else if(args[0] == 'view' || args[0] == 'list'){
          if(badwordsList.length <= 0){
            embed.setDescription("The badwords list is empty.")
              .setColor("RED");
          }
          else{
            embed.setDescription(`Badwords list-\n||\`${badwordsList}\`||`);
          }
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
        else if(args[0] == 'clear'){
          if(badwordsList.length <= 0){
            embed.setDescription("The badwords list is already empty.")
              .setColor("RED");
          }
          else{
            await database.set("badwordsList", null);
            embed.setDescription("Sucessfully cleared the database.")
              .setColor("GREEN");
          }
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
        else{
          embed.setDescription("Please provide a word to add in the badwords list")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
          return;
        }
      }
      else{
        args[1] = args[1].toLowerCase();
        if(args[0] == 'add'){
          for(let i=0; i<=badwordsList.length-1; i++){
            if(args[1] == badwordsList[i]){
              embed.setDescription("The word is already present in the database.")
                .setColor("RED");
              await message.channel.send(embed).catch(error => {/*nothing*/});
              return;
            }
          }
          badwordsList[badwordsList.length] = args[1];
          await database.set("badwordsList", badwordsList.join(" "));
          embed.setDescription(`Successfully added ||${badwordsList[badwordsList.length-1]}|| into the badwords list.`)
            .setColor("GREEN");
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
        else if(args[0] == 'remove'){
          let pos = -1, word;
          for(let i=0; i<=badwordsList.length-1; i++){
            if(args[1] == badwordsList[i]){
              word = badwordsList[i];
              pos = i;
              break;
            }
          }
          if(pos == -1){
            embed.setDescription("That word is not present in the database.")
              .setColor("RED");
            await message.channel.send(embed).catch(error => {/*nothing*/});
            return;
          }
          for(let i = pos; i <= badwordsList.length-1; i++){
            badwordsList[i] = badwordsList[i+1];
          }
          badwordsList.pop();
          await database.set("badwordsList", badwordsList.join(" "));
          embed.setDescription(`Successfully removed ||${word}|| from the badwords list.`)
            .setColor("GREEN");
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
      }
    }
  }
}