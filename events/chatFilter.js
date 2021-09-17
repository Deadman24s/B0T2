module.exports = async(Discord, message, content, database, isAdmin) =>{
  if(!isAdmin(message.member)){
    let chatFilterLogsChannelID = await database.get("chatFilterLogsChannelID");
    if(!chatFilterLogsChannelID){
      return;
    }
    let chatFilterLogsChannel = message.guild.channels.cache.get(chatFilterLogsChannelID);
    if(!chatFilterLogsChannel){
      return;
    }
    let chatFilterEmbed = new Discord.MessageEmbed()
      .setTitle("Chat Filter Log")
      .setColor("YELLOW")
      .setTimestamp();
    let swearsList = await database.get('swearsList');
    let badwordsList = await database.get("badwordsList");
    if((!swearsList) && (!badwordsList)){
      return;
    }
    if(swearsList){
      let swearings = swearsList.split(" ");
      if(swearings){
        for(let i=0; i<=swearings.length-1; i++){
          if(content.includes(swearings[i])){
            await message.reply("No swearing bruh.").then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 10000)).catch(error => {/*nothing*/});
            chatFilterEmbed.setDescription(`
              **User**- ${message.author.tag}\n
              **ID**- ${message.author.id}\n
              **Message**- ${message.content}\n
              **Filtered**- ${swearings[i]}\n
              **Result**- Deleted`);
            await chatFilterLogsChannel.send(chatFilterEmbed).catch(error => {/*nothing*/});
            await message.delete().catch(error => {/*nothing*/});
            return;
          }
        }
      }
    }
    if(badwordsList){
      let badwords = badwordsList.split(" ");
      if(badwords){
        for(let i=0; i<=badwords.length-1; i++){
          if(content.includes(badwords[i])){
            await message.react("🇳").then(
              message.react("🇴"),
              message.react("🇺")
            );
            chatFilterEmbed.setDescription(`
              **User**- ${message.author.tag}\n
              **ID**- ${message.author.id}\n
              **Message**- ${message.content}\n
              **Filtered**- ${badwords[i]}\n
              **Result**- Reacted with 🇳 🇴 🇺`);
            await chatFilterLogsChannel.send(chatFilterEmbed).catch(error => {/*nothing*/});
            return;
          }
        }
      }
    }
  }
}