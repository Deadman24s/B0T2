const chatBot = require('djs-chatbot');

module.exports = async(Discord, client, message, args, database, messageEmojiFinder) =>{
  let chatBotChannelID = await database.get("chatBotChannelID");
  if(chatBotChannelID){
    let chatBotChannel = message.guild.channels.cache.get(chatBotChannelID);
    if(chatBotChannel){
      if(message.channel.id == chatBotChannelID){
        let input = message.content;
        if(input.length > 500){
          input.length= 500;
        }
        let reply = await chatBot.chat({ Message: input });
        await message.reply(reply).catch(error => {});
      }
    }
  }
}