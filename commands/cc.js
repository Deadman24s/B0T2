module.exports = {
  name: "cc",
  description: "create custom commands",
  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
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
    let key, msg;
    if((!args[0]) || args[0] == 'help'){
      embed.setDescription(`**Custom Commands Help**-\n
        **01** ~~»~~ __\`${prefix}cc help\`__- *To open this help message*.
        **02** ~~»~~ __\`${prefix}cc create <command> <message>\`__- *To create a custom command*.
        **03** ~~»~~ __\`${prefix}cc update <command> <message>\`__- *To update a custom command*.
        **04** ~~»~~ __\`${prefix}cc remove <command>\`__- *To remove a custom command*.`);
      await message.channel.send(embed).catch(console.error());
    }
    else if(args[0] == 'create' || args[0] == 'new' || args[0] == 'make'){
      if(!args[1]){
        embed.setDescription("Please provide a word to make its command.")
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }
      key = await database.get(`customCommand_${args[1]}`);
      if(key){
        embed.setDescription(`\`${prefix + args[1]}\` is already present in the dataabse.`)
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }
      if(!args[2]){
        embed.setDescription(`Kindly provide a message also, for the custom command \`${prefix + args[1]}\``)
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }
      msg = messageEmojiFinder(client, message, args.slice(2));
      await database.set(`customCommand_${args[1]}`, msg);
      embed.setDescription(`Successfully created the custom command.\nCommand- \`${args[1]}\`\nKey- \`${msg}\``)
        .setColor("GREEN");
      await message.channel.send(embed);
    }
    else if(args[0] == 'edit' || args[0] == 'update'){
      if(!args[1]){
        embed.setDescription("Please provide a custom command's name to edit.")
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }
      let key = await database.get(`customCommand_${args[1]}`);
      if(!key){
        embed.setDescription(`There is no custom command as \`${prefix + args[1]}\`.`)
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }
      if(!args[2]){
        embed.setDescription(`Kindly provide a new message for the custom command \`${prefix + args[1]}\``)
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }
      let msg = messageEmojiFinder(client, message, args.slice(2));
      await database.set(`customCommand_${args[1]}`, msg);
      embed.setDescription(`Successfully updated the custom command.\nCommand- \`${args[1]}\`\nKey- \`${msg}\``)
        .setColor("GREEN");
      await message.channel.send(embed);
    }
    else if(args[0] == 'remove' || args[0] == 'reset' || args[0] == 'clear' || args[0] == 'delete'){
      if(!args[1]){
        embed.setDescription("Please provide a custom command's name to edit.")
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }
      let key = await database.get(`customCommand_${args[1]}`);
      if(!key){
        embed.setDescription(`There is no custom command as \`${prefix + args[1]}\`.`)
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }
      await database.set(`customCommand_${args[1]}`, null);
      embed.setDescription(`Successfully removed the custom command \`${prefix + args[1]}\``)
        .setColor("GREEN");
      await message.channel.send(embed);
    }
  }
}