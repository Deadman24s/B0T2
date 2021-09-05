module.exports = {
  name : 'add',
  description : 'to add a person to a ticket',

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
        await message.channel.send('Please provide ID of the person you want to add.');
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
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        EMBED_LINKS: true,
        ATTACH_FILES: true,
        READ_MESSAGE_HISTORY: true,
        USE_EXTERNAL_EMOJIS: true,
        CHANGE_NICKNAME: true
      }).catch(console.error);
      embed.setDescription(`Successfully added ${person} to the ticket.`)
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