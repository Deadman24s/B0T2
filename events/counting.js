module.exports = async(message, args, database, prefix, isAdmin, errorMessageBuilder) =>{
  if(message.guild){
    if(message.author.bot) return;
    const countingChannelID = await database.get("countingChannelID");
    if(!countingChannelID){
      console.log(errorMessageBuilder("Counting Channel's ID is not provided."));
      return;
    }
    const countingChannel = message.guild.channels.cache.get(countingChannelID);
    if(!countingChannel){
      console.log(errorMessageBuilder("Counting Channel's not present."));
      return;
    }
    if(isAdmin(message.member)){
      if(args[0] == `${prefix}setCount`){
        if((!args[1]) || (isNaN(args[1])))
          await message.author.send("Provide a count number bruh.");
        else{  
          let n = args[1] *1;
          await database.set("num", n);
          await database.set("lastSender", null);
          await message.author.send(`Count set to ${args[1]}`);
        }
      }
      if(args[0] == `${prefix}resetCount`){
        await database.set("num", 0);
        await database.set("lastSender", null);
        await message.author.send("Count resetted to 0");
      }
    }
    if(message.channel.id != countingChannelID){
      return;
    }
    let checknum = await database.get("num");
    if(!checknum){
      checknum = 0;
      await database.set("num", 0);
    }
    let lastSender = await database.get("lastSender");
    if((message.author.id === lastSender) || (args[1]) || (args[0] != checknum+1)){
      message.delete();
      return;   
    }
    await database.set("lastSender", message.author.id);
    checknum++;
    await database.set("num", checknum);
    
    let ws, w;
    ws = await message.channel.fetchWebhooks();
    w = ws.first();
    if(!w){
      await message.channel.createWebhook(message.author.username, {
        avatar: message.author.displayAvatarURL({dynamic: true}),
      });
    }
    try {
      const webhooks = await message.channel.fetchWebhooks();
      const webhook = webhooks.first();
      await webhook.send(args[0], {
        username: message.author.username,
        avatarURL: message.author.displayAvatarURL(),
      });
    }catch (error) {
      console.error('Error trying to send: ', error);
    }
    await message.delete();
  }
}