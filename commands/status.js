const util = require('minecraft-server-util');
module.exports = {
  name : 'status',
  description : 'status of MC server.',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp(); 
    let IP = await database.get("IP");
    const numericIP = await database.get("numericIP");
    let Port = Number(await database.get("port"));  
    if((!Port) || isNaN(Port)){
      Port = 25565;
    }
    if(numericIP && Port){
      if(!IP)
        IP = numericIP;
      util.status(numericIP, { port: Port, enableSRV: true, timeout: 5000, protocolVersion: 47 })
        .then((response) => {
          embed.setAuthor(`🟢${message.guild.name}`, message.guild.iconURL())
            .setTitle("Server Status-")
            .setDescription(`**IP**- __${IP}__.
              **PORT**- __${response.port}__.
              **VERSION**- __${response.version}__.
              **PLAYING**- __${response.onlinePlayers}__/__${response.maxPlayers}__.`)
            .setColor("GREEN");
          message.channel.send(embed); 
        }).catch((error) => {
          embed.setAuthor(`🔴${message.guild.name}`, message.guild.iconURL())
            .setTitle("OFFLINE")
           .setColor("RED");
          message.channel.send(embed);
        });
    }
    else{
      embed.setDescription("The server IP/port etc is not set. Kindly ask the server staff to set them first.")
        .setColor("RED");
      await message.channel.send(embed);
    }
  }
}