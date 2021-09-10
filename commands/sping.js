const Discord = require("discord.js");
module.exports = {
  name : 'sping',
  description : 'to troll',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    }
    if(!isAdmin(message.guild.me)){
      await message.reactions.removeAll();
      await message.react('❌');
      embed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    let i, n=100;
    if(!args[0]){
      embed.setDescription("Please provide a user ID or mention.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    if(args[1]){
      if(0 <= args[1] <= 100){
        n = args[1];
      }
    }
    let person = personFinder(message, args[0], "member");
      if(person === "not found"){
        embed.setDescription("Wrong user provided or user doesn't exists in this server.")
          .setColor("RED");
      await message.channel.send(embed);
      return;
    } 
    let tempChannel = message.channel;
    await message.delete();
    for(i=0; i<=n; i++){
      tempChannel.send(`${person}`).then((m) => setTimeout(function(){m.delete();}, 100));
    }
  }
}