const ytdl = require("ytdl-core");
const queue = new Map();

module.exports = async(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, command) => {
  let embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTimestamp();
  if(!isAdmin(message.guild.me)){
    await message.reactions.removeAll();
    await message.react('❌').catch(err => {/*nothing*/});
    embed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.");
    await message.channel.send(embed).catch(error => {/*nothing*/});
    return;
  }
  const serverQueue = queue.get(message.guild.id);

  const file = require(`./commands/${command}.js`);
  file(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, queue, ytdl, serverQueue);
}