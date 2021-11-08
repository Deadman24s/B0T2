module.exports = {
  name : 'members',
  description : 'member count of the server',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setColor("YELLOW")
      .setTimestamp();
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let membersmap = message.guild.members.cache
      .sort((a, b) => b.position - a.position)
      .map(r => r);
    let membersMap = [];
    let extraText = ".";
    let n;
    if(!membersmap){ 
      roleMap = "No members";
    }else{
      n = membersmap.length;
      if(n>50){
        extraText = ` **+ __${n-50}__ members**.`
        n = 50;
      }
      for(let i=0; i<=n-1; i++){
        membersMap[i] = membersmap[i];
      }
      membersMap = membersMap.join(", ");
      membersMap = membersMap + extraText;
    }
    embed.setDescription(`
      **Total Users**: __${message.guild.memberCount}__
      **Members**: __${message.guild.members.cache.filter(m => !m.user.bot).size}__
      **Bots**: __${message.guild.members.cache.filter(m => m.user.bot).size}__`);
    await message.channel.send(embed).catch(error => {/*nothing*/});       
    embed.setTitle(`${membersmap.length} Members`)
    .setDescription(membersMap);     
    await message.channel.send(embed).catch(error => {/*nothing*/});
    }
}