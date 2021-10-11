module.exports = async(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, content) =>{
  let embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("YELLOW")
    .setAuthor(`B0T`, client.user.displayAvatarURL({dynamic: true}))
    .setThumbnail(message.guild.iconURL());
  if(content == 'gm') {
    await message.channel.send("Good Morning!").catch(error => {/*nothing*/});
  }
  else if(content == 'gn'){
    await message.channel.send("Good Night!").catch(error => {/*nothing*/});
  }
  else if(content == 'rip'){
    const attachment = new Discord.MessageAttachment('https://i.imgur.com/w3duR07.png');
    await message.channel.send(attachment).catch(error => {/*nothing*/});
  }
  else if(content == 'prefix?' || (message.mentions.users.first() == client.user)){
    await message.channel.send(`My prefix is **\`${prefix}\`**.`).catch(error => {/*nothing*/});
  }
  else if(content == `f`){
    const fid = await database.get('fEmojiID');
    let f = client.emojis.cache.get(fid);
    if(!f){
      f = client.emojis.cache.get("836091658969808907");
    }
    await message.react(f);
  }
  else if(content.includes('haha') || content.includes('hehe') || content.includes('heeh')){
    await message.channel.send('https://tenor.com/view/you-mad-bro-u-mad-bro-laugh-ha-ha-ha-are-you-mad-gif-17215780').then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 5000)).catch(error => {/*nothing*/});
  }
  else if(content == "hi" || content == "hello" || content == "helo" || content == "hemlo" || content == "hey"){
    await message.channel.send("Hemlo").catch(error => {/*nothing*/});
  }
  if(message.mentions.members.first()){
    let p = personFinder(message, args[0], "member");
    if(p){
      if(p.bot){
        return;
      }
      let staffRoleID = await database.get("staffRoleID");
      if((!isAdmin(message.member)) && (!message.member.roles.cache.has(staffRoleID))){
        if(staffRoleID){
          if(isAdmin(p) || p.roles.cache.has(staffRoleID)){
            if(message.content.length > 1500){
              message.content.length = 1500;
              message.content = message.content + '...';
            }
            await message.reply("Do not ping the STAFF.").then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 5000)).catch(error => {/*nothing*/});
            embed.setTitle(`You Were Pinged`)
              .setDescription(`By- ${message.author.tag} | ${message.author.id}
              Guild- ${message.guild} | ${message.guild.id}
              Channel- ${message.channel.name} | ${message.channel.id}
              Content- ${message.content}`);
            await p.send(embed).catch(error => {});
            await message.delete().catch(error => {/*Message not present*/});
            return;
          }
        }
      }
      let afkStatus = await database.get(`${p.id} afkStatus`);
      if(afkStatus && afkStatus == "true"){
          let msg = await database.get(`${message.author.id} afkMessage`);
          embed = new Discord.MessageEmbed()
            .setDescription(`${p} is currently AFK: ${msg}`)
            .setColor("RED")
            .setTimestamp();
          await message.reply(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {});}, 5000)).catch(error => {});
      }
    }
  }
  let afkStatus = await database.get(`${message.author.id} afkStatus`);
  let lastDisplayName = await database.get(`${message.author.id} lastDisplayName`);
  if(afkStatus && afkStatus == "true"){
    embed = new Discord.MessageEmbed()
      .setDescription("Successfully Removed your AFK status.")
      .setColor("GREEN")
      .setTimestamp();
    await database.set(`${message.author.id} afkStatus`, "false");
    await database.set(`${message.author.id} afkMessage`, null);
    await message.reply(embed).catch(error => {});
    await message.member.setNickname(lastDisplayName).catch(error => {});
  }
}