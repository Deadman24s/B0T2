module.exports = {
  name : 'remove',
  description : 'to remove a person from a ticket',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
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
    if(message.channel.name.startsWith("ticket") || message.channel.name.startsWith("bug") || message.channel.name.startsWith("report")){
      if(!args[0]){
        await message.channel.send('Please provide ID of the person you want to remove.');
        return;
      }
      let person = personFinder(message, args[0]);
      if(person === "not found"){
        embed.setDescription("Wrong user provided or user doesn't exists in this server.")
          .setColor("RED");
        await message.channel.send(embed);
        return;
      } 
      await message.channel.updateOverwrite(person, {
        VIEW_CHANNEL: false,
        SEND_MESSAGES: false,
        EMBED_LINKS: false,
        ATTACH_FILES: false,
        READ_MESSAGE_HISTORY: false,
        USE_EXTERNAL_EMOJIS: false,
        CHANGE_NICKNAME: false
      }).catch(console.error);
      embed.setDescription(`Successfully removed ${person} from the ticket.`)
        .setColor("GREEN");
      await message.channel.send(embed);  
    }
    else{
      embed.setDescription("You can use this command only inside a ticket.")
        .setColor("RED");
      await message.channel.send(embed);
    }
  }
}