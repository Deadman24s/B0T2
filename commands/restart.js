const config = require("../config.json");
const authorID = config.authorID;

module.exports = {
  name : 'restart',
  description : 'to restart the bot.',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    if(message.author.id == authorID){
      let embed = new Discord.MessageEmbed()
        .setDescription("__**`RESTARTING`**__")
        .setColor("GREEN")
        .setTimestamp();
      await message.channel.send(embed).catch(error => {});
      setTimeout(function(){
        process.exit().catch(error => {/*nothing*/});
      }, 5000);
    }
    else{
      await message.reactions.removeAll();
      await message.reactions.removeAll();
      react(message, '❌');
    }
  }
}            