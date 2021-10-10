module.exports = {
  name : 'restart',
  description : 'to restart the bot.',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    if(message.author.id == "564106279862140938"){
      let embed = new Discord.MessageEmbed()
        .setDescription("__**`RESTARTING`**__")
        .setColor("GREEN")
        .setTimestamp();
      await message.channel.send(embed).catch(error => {});
      setTimeout(function(){
        process.exit().catch(error => {/*nothing*/});
      }, 5000);
    }
  }
}            