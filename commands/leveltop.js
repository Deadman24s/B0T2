const level = require("./level");

module.exports = {
  name : 'leveltop',
  description : 'to check level leaderboard',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setTitle("Level Top List")
      .setColor("RANDOM")
      .setTimestamp();
    let membersMap = message.guild.members.cache
      .sort((a, b) => b.position - a.position)
      .map(r => r.user.tag);
    let membersIDMap = message.guild.members.cache
      .sort((a, b) => b.position - a.position)
      .map(r => r.id); 
    if(membersMap.length <= 0){
      embed.setDescription("No Members Preset.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let levelsMap = [];
    for(let i=0; i<=membersMap.length-1; i++){
      levelsMap[i] = await database.get(`${membersIDMap[i].id} lvl`);
      if((!levelsMap[i]) || isNaN(levelsMap[i])){
        levelsMap[i] = 0;
        await database.set(`${membersMap[i].id} lvl`, levelsMap[i]);
      }
      levelsMap[i] *= 1;
    }
    let temp, temp1;
    for(let i=0; i<=levelsMap.length-1; i++){
      for(let j=0; j<=levelsMap.length-1-i; j++){
        if(levelsMap[j] < levelsMap[j+1]){
          temp = levelsMap[j];
          levelsMap[j] = levelsMap[j+1];
          levelsMap[j+1] = temp;
          temp1 = membersMap[j];
          membersMap[j] = membersMap[j+1];
          membersMap[j+1] = temp1;
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
        if(!(((((page-1)*10)+1) <= membersMap.length))){
          page = 1;
        }else{
          start += (page-1)*10;
          stop += (page-1)*10;
        }
      }
    }
    if(stop > membersMap.length-1){
      stop = membersMap.length-1;
    }
    let topLevelsMap = [];
    for(let i=start; i<=stop; i++){
      topLevelsMap[i] = `${i+1}. ${membersMap[i]} -> Level ${levelsMap[i]}.`;
    }
    topLevelsList = topLevelsMap.join("\n");
    embed.setDescription(topLevelsList)
      .setFooter(`Page- ${page}/${Math.floor(membersMap.length/10)+1}`);
    await message.channel.send(embed).catch(error => {});
  }
}