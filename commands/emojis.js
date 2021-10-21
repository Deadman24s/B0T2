module.exports = {
  name : 'emojis',
  description : 'member count of the server',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTimestamp();
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let guildIDsMap = client.guilds.cache
      .sort((a, b) => b.position - a.position)
      .map(g => g.id);
    let emojis = [];
    let emojiNames = [];
    let indexEmojiNames = 0;
    let indexEmojis = 0;
    for(let i=0; i<=guildIDsMap.length-1; i++){
      let guild = client.guilds.cache.get(guildIDsMap[i]);
      if(guild){
        let emojiNamesMap = guild.emojis.cache
          .sort((a, b) => b.position - a.position)
          .map(e => e.name);
        let emojisMap = guild.emojis.cache
          .sort((a, b) => b.position - a.position)
          .map(e => e.id);
        for(let j=0; j<=emojisMap.length-1; j++){
          emojiNames[indexEmojiNames] = emojiNamesMap[j];
          emojis[indexEmojis] = emojisMap[j];
          ++indexEmojiNames;
          ++indexEmojis;
        }
      }
    }
    let page = 1;
    let start = 0;
    let stop = 9;
    if(args[0] && (!isNaN(args[0]))){
      page = args[0] * 1;
      if(page < 1){
        page = 1;
      }
      else if(page > 1){
        if(((((page-1)*10)+1) > emojis.length)){
          page = 1;
        }else{
          start += (page-1)*10;
          stop += (page-1)*10;
        }
      }
    }
    if(stop > emojis.length-1){
      stop = emojis.length-1;
    }
    let emojisMap = [];
    let e;
    for(let i=start; i<=stop; i++){
      e = client.emojis.cache.get(emojis[i]);
      emojisMap[i] = `${e} » \`:${emojiNames[i]}:\``;
    }
    emojisList = emojisMap.join("\n");
    embed.setTitle("Emojis List")
      .setDescription(emojisList)
      .setFooter(`Page- ${page}/${Math.floor(emojis.length/10)+1}`);
    await message.channel.send(embed).catch(async error => {});
  }
}