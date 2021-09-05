module.exports = async(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, dbVerificationChannelID) => {
  const command = args.shift().toLowerCase();
  const dbMemeChannelID = await database.get('memeChannelID');
  const dbBotChannelID = await database.get('botChannelID');
  const ticketChannelID = await database.get('ticketChannelID');
  if(!isAdmin(message.member)){
    if(!dbBotChannelID){
      await message.channel.send("The bot channel is not set. Kindly ask the staff to set it.");
      return;
    }
    if(message.channel.id != dbVerificationChannelID){
      if(message.channel.id != dbMemeChannelID){
        if(!((command == "close") || ((command == 't' || command == 'ticket' || command == 'new' || command == 'create') && message.channel.id == ticketChannelID))){
          if(message.channel.id != dbBotChannelID){
            await message.reply(`Please use <#${dbBotChannelID}>.`).then((msg) => setTimeout(function(){msg.delete();}, 15000));
            await message.delete();
            return;
          }
        }  
      }
    }
  }
  if(!isAdmin(message.member)){    
    if(message.channel.id == dbVerificationChannelID){
      if(command !== "verify"){
        message.channel.send(`You are only allowed to use \`${prefix}verify\` command here.`).then((msg) => setTimeout(function(){msg.delete();}, 20500));
        message.delete();
        return;
      }
    }
  }
  if(!client.commands.has(command)){
    if(!isAdmin(message.member)){
      if(message.channel.id == dbVerificationChannelID){
        message.channel.send(`You are only allowed to use \`${prefix}verify\` command here.`).then((msg) => setTimeout(function(){msg.delete();}, 20500));
        message.delete();
        return;
      }
      return;
    }
    return;
  }
  try{
    client.commands.get(command).run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder);
  }catch(error){
    console.error(error);
  }
}