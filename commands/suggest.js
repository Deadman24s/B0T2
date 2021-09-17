module.exports = {
  name: "suggest",
  description: "suggest something",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, cmd){
    if(!cmd){
      cmd = "suggest";
    }
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      return;
    }
    if(!isAdmin(message.guild.me)){
      embed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      return;
    }
    let n = await database.get(`suggestion_number`);
    if(!n){
      n=0;
      await database.set(`suggestion_number`, n);
    }
    let upID = await database.get('upEmojiID');
    let up = client.emojis.cache.get(upID);
    if(!up){
      up = client.emojis.cache.get("822116117791113276");
    }
    let updownID = await database.get('updownEmojiID');
    let updown = client.emojis.cache.get(updownID);
    if(!updown){
     updown = client.emojis.cache.get("822116137596354560"); 
    }
    let downID = await database.get('downEmojiID');
    let down = client.emojis.cache.get(downID);
    if(!down){
      down = client.emojis.cache.get("822116155489386536");
    }
    if(!(up || updown || down)){
      embed.setDescription("The suggestion emojis are not setup. Please ask the staff to set them first")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      return;
    }
    let suggestionChannelID = await database.get("suggestionChannelID");
    if(!suggestionChannelID){
      await message.channel.send("The suggestions channel is not setup kindly ask the staff to set it up.").catch(error => {/*nothing*/});
      return;
    }
    const suggestionChannel = message.guild.channels.cache.get(suggestionChannelID);
    if(!suggestionChannel){
      await message.channel.send("The suggestions channel is not setup kindly ask the staff to set it up.").catch(error => {/*nothing*/});
      return;    
    }
    let suggestionEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${message.author.username}`, message.guild.iconURL())
      .setThumbnail(message.author.displayAvatarURL())
      .setFooter(message.guild.name)
      .setTimestamp();
    if(isAdmin(message.member) === "true"){
      if(args[0] == 'help'){
        embed.setDescription(`
            **Suggestion Help**\n
            **01** ~~»~~ __\`${prefix}suggestion accept <ID> <reason>\`__- *To accept a suggestion*.
            **02** ~~»~~ __\`${prefix}suggestion reject <ID> <reason>\`__- *To reject a suggestion*.`);
        await message.channel.send(embed).catch(error => {/*nothing*/});  
      }
      else if(args[0] == "accept" || args[0] == "reject"){
        if((!args[1]) || isNaN(args[1]) || args[1] > n){
          embed.setDescription("That suggestion doesn't exists.")
            .setColor("RED");
          message.channel.send(embed).catch(error => {/*nothing*/});
          return;
        }
        let suggestionID = await database.get(`suggestion${n}_ID`);
        if(!suggestionID){
          embed.setDescription("There is no suggestion witht hat ID.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
          return;
        }
        let suggestion = message.guild.channels.cache.get(suggestionChannelID).messages.fetch(suggestionID);
        if(!suggestion){
          embed.setDescription("The suggestion no longer exists.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
          return;
        }
        let isEdited = await database.get(`suggestion${n}_isEdited`);
        if(isEdited != "false"){
          embed.setDescription(`The suggestion is already ${isEdited}.`)
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
          return;
        }
        let reason = editMessage(args.slice(0)).join(" ").replace(" \n ", '\n');
        if(args[0] == "accept"){
          isEdited = "**__Accepted__**";
        }else if(args[0] == "reject"){
          isEdited = "**__Rejected__**";
        }
        await database.set(`suggestion${n}_isEdited`, isEdited);
        let content = await database.get(`suggestion${n}_content`);
        let text = "Reason";
        if(isEdited == "**__Accepted__**")
          text = "Comment"
        suggestionEmbed.addFields(
          {
            name: `Suggestion [${n}]`,
            value: `${content}`
          },
          {
            name: `Result`,
            value: isEdited
          },
          {
            name: text,
            value: reason
          }
        );
        await message.guild.channels.cache.get(suggestionChannelID).messages.fetch(suggestionID).edit(suggestionEmbed).catch(error => {/*nothing*/});
        await database.set(`suggestion${n}_isEdited`, isEdited);
        embed.setDescription(`Successfully ${isEdited} the suggestion.\nSuggestion ID- ${n}`)
          .setColor("GREEN");
        await message.channel.send(embed).catch(error => {/*nothing*/});
      }
    }
    if(message.guild){
      if(!args[0]){
        embed.setDescription(`Suggest Something lol.\nSyntax- \`${prefix + cmd} <suggestion>\`.`)
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        return;  
      }
      let suggestion = messageEmojiFinder(client, message, args.slice(0));
      n = n+1;
      suggestionEmbed.addField(`Suggestion [${n}]`, `${suggestion}`);
      let s, sid;
      s = await suggestionChannel.send(suggestionEmbed).catch(error => {/*nothing*/});
      sid = s.id;
      await s.react(up).then(
        s.react(updown),
        s.react(down)
      );
      await database.set(`suggestion_number`, n);
      await database.set(`suggestion${n}_ID`, sid);
      await database.set(`suggestion${n}_content`, suggestion);
      await database.set(`suggestion${n}_isEdited`, "false");
      embed.setDescription(`Successfully posted your suggestion in ${suggestionChannel}.`)
        .setColor("GREEN");       
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
  }
}