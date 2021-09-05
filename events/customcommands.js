//response.host, response.port, response.version
module.exports = async(Discord, client, message, args, database, messageEmojiFinder) =>{
  let embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setColor("YELLOW")
    .setTimestamp();
  const key =  await database.get(`customCommand_${args[0]}`);
  if(key){
    let parts = key.replace("\n", " \n ").split(" ");
    let msg = messageEmojiFinder(client, message, parts);
    embed.setDescription(msg);
    await message.channel.send(embed);
  }    
}