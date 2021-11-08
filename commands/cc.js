module.exports = {
  name: "cc",
  description: "create custom commands",
  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react, helptext){
    if(!helptext){
      helptext = "cc";
    }
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let key, msg;
    if(args[1]){
      args[1] = args[1].toLowerCase(); 
    }
    if((!args[0]) || args[0].toLowerCase() == 'help'){
      embed.setDescription(`**Custom Commands Help**-\n
        **01** ~~»~~ __\`${prefix}${helptext} help\`__- *To open this help message*.
        **02** ~~»~~ __\`${prefix}${helptext} create <command> <message>\`__- *To create a custom command*.
        **03** ~~»~~ __\`${prefix}${helptext} update <command> <message>\`__- *To update a custom command*.
        **04** ~~»~~ __\`${prefix}${helptext} remove <command>\`__- *To remove a custom command*.`);
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
    else if(args[0].toLowerCase() == 'create' || args[0].toLowerCase() == 'new' || args[0].toLowerCase() == 'make'){
      if(!args[1]){
        embed.setDescription("Please provide a word to make its command.")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      key = await database.get(`customCommand_${args[1]}`);
      if(key){
        embed.setDescription(`\`${prefix + args[1]}\` is already present in the dataabse.`)
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      if(!args[2]){
        embed.setDescription(`Kindly provide a message also, for the custom command \`${prefix + args[1]}\``)
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      msg = messageEmojiFinder(client, message, args.slice(2));
      await database.set(`customCommand_${args[1]}`, msg);
      embed.setDescription(`Successfully created the custom command.\nCommand- \`${args[1]}\`\nKey- \`${msg}\``)
        .setColor("GREEN");
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
    else if(args[0].toLowerCase() == 'edit' || args[0].toLowerCase() == 'update'){
      if(!args[1]){
        embed.setDescription("Please provide a custom command's name to edit.")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      let key = await database.get(`customCommand_${args[1]}`);
      if(!key){
        embed.setDescription(`There is no custom command as \`${prefix + args[1]}\`.`)
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      if(!args[2]){
        embed.setDescription(`Kindly provide a new message for the custom command \`${prefix + args[1]}\``)
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      let msg = messageEmojiFinder(client, message, args.slice(2));
      await database.set(`customCommand_${args[1]}`, msg);
      embed.setDescription(`Successfully updated the custom command.\nCommand- \`${args[1]}\`\nKey- \`${msg}\``)
        .setColor("GREEN");
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
    else if(args[0].toLowerCase() == 'remove' || args[0].toLowerCase() == 'reset' || args[0].toLowerCase() == 'clear' || args[0].toLowerCase() == 'delete'){
      if(!args[1]){
        embed.setDescription("Please provide a custom command's name to edit.")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      let key = await database.get(`customCommand_${args[1]}`);
      if(!key){
        embed.setDescription(`There is no custom command as \`${prefix + args[1]}\`.`)
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      await database.set(`customCommand_${args[1]}`, null);
      embed.setDescription(`Successfully removed the custom command \`${prefix + args[1]}\``)
        .setColor("GREEN");
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
  }
}