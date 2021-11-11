module.exports = {
  name : 'eembed',
  description : 'to make extensive embeds',
  
  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM");
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    if((!args[0]) || args[0].toLowerCase() == "help"){
      embed.setDescription(`
      **Extensive Embed Help**\n
      **01** ~~»~~ __\`${prefix}eembed setAuthor <name>\`__- *To set the author of embed*.
      `);
    }
    else if(args[0].toLowerCase() == "set"){
      let value, text;
      if(args[1].toLowerCase() == "author"){
        value = args.slice(2).join(" ");
        await message.channel.send(author).catch(error => {});
        await database.set(`eembed${args[1]}`, author);
      }
      else{
        embed.setDescription("There is no subcommand with that name.")
          .setColor("RED");
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      embed.setDescription(`Successfully set \`extensive embed ${args[1]}\` as \`${value}\``)
        .setColor("RED");
      await message.channel.send(embed).catch(error => {});
    }
  }
}