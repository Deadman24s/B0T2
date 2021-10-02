const music = require("../music/index.js");

module.exports = async(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, dbVerificationChannelID) => {
  let command = args.shift().toLowerCase();
  const dbMemeChannelID = await database.get('memeChannelID');
  const dbBotChannelID = await database.get('botChannelID');
  const ticketChannelID = await database.get('ticketChannelID');
  
  if(!isAdmin(message.member)){
    if(!dbBotChannelID){
      await message.reply("The bot channel is not set. Kindly ask the staff to set it.").then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 15000)).catch(error => {/*nothing*/});
      await message.delete().catch(error => {/*nothing*/});
      return;
    }
    if(message.channel.id != ticketChannelID && message.channel.id != dbMemeChannelID && message.channel.id != dbBotChannelID && message.channel.id != dbVerificationChannelID){
      await message.reply(`Please use <#${dbBotChannelID}>.`).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 15000)).catch(error => {/*nothing*/});
      await message.delete().catch(error => {/*nothing*/});
      return;
    }
    if(message.channel.id == ticketChannelID){
      if(command != "t" && command != "ticket" && command != "new" && command != "create"){
        await message.reply(`Please use <#${dbBotChannelID}>.`).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 15000)).catch(error => {/*nothing*/});
        await message.delete().catch(error => {/*nothing*/});
        return;        
      }
    }
    if(message.channel.id == dbMemeChannelID){
      if(command != "meme"){
        await message.reply(`Please use <#${dbBotChannelID}>.`).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 15000)).catch(error => {/*nothing*/});
        await message.delete().catch(error => {/*nothing*/});
        return;
      }
    }
    if(message.channel.id == dbVerificationChannelID){
      if(command != "verify"){
        await message.reply(`You are only allowed to use \`${prefix}verify\` command here.`).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 15000)).catch(error => {/*nothing*/});
        await message.delete().catch(error => {/*nothing*/});
        return;
      }
    }
  }
  const customCommand = await database.get(`customCommand_${command}`);
  if((!client.commands.has(command)) && command != "apply" && (!customCommand) && command != "play" && command != "skip" && command != "stop"){
    if(message){
      await message.react('❌');
    }
    return;
  }else{
    await message.react('✅').catch(err => {
      //mf blocked the bot.
    });
  }
  if(client.commands.has(command)){
    await client.commands.get(command).run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder);
  }else{
    music(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, command);
  }
}