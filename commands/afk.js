module.exports = {
  name : 'afk',
  description : 'to set afk status',
  
  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    let afkStatus = await database.get(`${message.author.id} afkStatus`);
    let lastDisplayName = await database.get(`${message.author.id} lastDisplayName`);
    if(!afkStatus){
      afkStatus = "false";
      await database.set(`${message.author.id} afkStatus`, "false");
    }
    if(afkStatus == "true"){
      embed.setDescription("Successfully removed your AFK status.")
        .setColor("GREEN");
      await message.channel.send(embed).catch(error =>{});
      await database.set(`${message.author.id} afkStatus`, "false");
      await database.set(`${message.author.id} afkMessage`, null);
      await message.member.setNickname(lastDisplayName).catch(error => {});
    }
    else{
      let msg;
      if(args[0]){
        msg = messageEmojiFinder(client, message, args); 
      }else{
        msg = "AFK";
      }
      if(msg.length > 500){
        msg.length=500;
        msg = msg + "...";
      }
      embed.setDescription(`Successfully set your AFK status: ${msg}`)
        .setColor("GREEN");
      await message.channel.send(embed).catch(error =>{});
      await database.set(`${message.author.id} afkStatus`, "true");
      await database.set(`${message.author.id} afkMessage`, msg);
      await database.set(`${message.author.id} lastDisplayName`, message.member.displayName);
      await message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(error => {});
    }      
  }
}