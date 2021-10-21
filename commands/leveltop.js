module.exports = {
  name : 'leveltop',
  description : 'to check level leaderboard',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setTitle("Level Top List")
      .setColor("RANDOM")
      .setTimestamp();
    let membersIDMapTemp = message.guild.members.cache
      .filter(m => !m.user.bot)
      .sort((a, b) => b.position - a.position)
      .map(r => r.id); 
    if(membersIDMapTemp.length <= 0){
      embed.setDescription("No Members Preset.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let membersIDMap = [];
    for(let i=0; i<=membersIDMapTemp.length-1; i++){
      membersIDMap[i] = membersIDMapTemp[i];
    }
    let levelsMap = [];
    for(let i=0; i<=membersIDMap.length-1; i++){
      levelsMap[i] = await database.get(`${membersIDMap[i]} lvl`);
      if((!levelsMap[i]) || isNaN(levelsMap[i])){
        levelsMap[i] = 0;
        await database.set(`${membersIDMap[i]} lvl`, levelsMap[i]);
      }
      levelsMap[i] *= 1;
    }
    let coinsMap = [];
    for(let i=0; i<=membersIDMap.length-1; i++){
      coinsMap[i] = await database.get(`${membersIDMap[i]} coins`);
      if((!coinsMap[i]) || isNaN(coinsMap[i])){
        coinsMap[i] = 0;
        await database.set(`${membersIDMap[i]} coins`, coinsMap[i]);
      }
    }
    let temp;
    for(let i=0; i<=levelsMap.length-1; i++){
      for(let j=0; j<=levelsMap.length-1-i; j++){
        if(levelsMap[j] < levelsMap[j+1]){
          temp = levelsMap[j];
          levelsMap[j] = levelsMap[j+1];
          levelsMap[j+1] = temp;
          temp = membersIDMap[j];
          membersIDMap[j] = membersIDMap[j+1];
          membersIDMap[j+1] = temp;
          temp = coinsMap[j];
          coinsMap[j] = coinsMap[j+1];
          coinsMap[j+1] = temp;
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
        if(((((page-1)*10)+1) > membersIDMap.length)){
          page = 1;
        }else{
          start += (page-1)*10;
          stop += (page-1)*10;
        }
      }
    }
    if(stop > membersIDMap.length-1){
      stop = membersIDMap.length-1;
    }
    let topLevelsMap = [];
    let coinText = "coin";
    for(let i=start; i<=stop; i++){
      if(coinsMap[i] > 1){
        coinText += "s";
      }
      topLevelsMap[i] = `${i+1}. <@${membersIDMap[i]}> » Level ${levelsMap[i]}. [${coinsMap[i].toFixed(3)} ${coinText}]`;
    }
    topLevelsList = topLevelsMap.join("\n");
    embed.setDescription(topLevelsList)
      .setFooter(`Page- ${page}/${Math.floor(membersIDMap.length/10)+1}`);
    await message.channel.send(embed).catch(error => {});
    for(let i=0; i<=membersIDMap.length-1; i++){
      await database.set(`${membersIDMap[i]} rank`, i+1);
    }
  }
}