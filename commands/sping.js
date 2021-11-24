const config = require("../config.json");
const authorID = config.authorID;
const Discord = require("discord.js");

module.exports = {
  name : 'sping',
  description : 'to troll',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    }
    let i, n=100;
    if(!args[0]){
      embed.setDescription("Please provide a user ID or mention.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      await message.react('❌');
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
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      await message.react('❌');
      return;
    } 
    if(person.id == authorID){
      embed.setDescription("NOU")
        .setColor("RED");
      await message.channel.send(embed).then((m) => setTimeout(function(){m.delete().catch(error => {/*nothing*/});}, 100)).catch(error => {/*nothing*/});
      person = message.author;
    }
    let tempChannel = message.channel;
    await message.delete().catch(error => {/*nothing*/});
    for(i=0; i<=n; i++){
      tempChannel.send(`${person}`).then((m) => setTimeout(function(){m.delete().catch(error => {/*nothing*/});}, 100)).catch(error => {/*nothing*/});
    }
  }
}