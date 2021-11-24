const Keyv = require("keyv");

module.exports = async(Discord, member, Canvas, path, database) =>{
  let embed = new Discord.MessageEmbed()
  .setAuthor(member.guild.name, member.guild.iconURL())
    .setColor("RED")
    .setTimestamp();
  const gDB = new Keyv('sqlite://./databases/database.sqlite', {
    table: `gDB`
  });
  gDB.on('error', err => console.log('Connection Error', err));
  let count = await gDB.get("illegalNamesCount");
  if(!count){
    count = 0;
    await database.set("illegalNamesCount", count);
  }
  const ascii = /^[ -~]+$/;
  if(!ascii.test(member.displayName)){
    let oldName = member.displayName;
    await member.setNickname(`moderated-name-${++count}`);
    let newName = member.displayName;
    await database.set("illegalNamesCount", count);
    embed.setDescription(`Your name [${oldName}] contains illegal characters.\nSo i have changed it to [${newName}].\nKindly ask a server staff to change it now.`);
    await member.send(embed).catch(error => {});
  }
  const type = "Welcome";
  const serverStatusUpdater = require('../updater/serverStatusUpdater.js');
  serverStatusUpdater(member, database);  
  const wlCanvasBuilder = require('../builders/wlCanvasBuilder.js');
  wlCanvasBuilder(Discord, member, Canvas, path, database, type);
}