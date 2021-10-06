module.exports = {
  name : 'testjoin',
  description : 'fake server join-leave message',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      await message.react('❌').catch(err => {/*nothing*/});
      return;
    }
    let person;
    if(args[0]){
      person = message.guild.members.cache.get(args[0]);
    }
    if(!person){
      person = message.member;
    }
    await client.emit('guildMemberAdd', person);
    await client.emit('guildMemberRemove', person);
  }
}