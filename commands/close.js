const fs = require('fs');
const path = require('path');
const dateBuilder = require('../builders/dateBuilder.js');
module.exports = {
  name: "close",
  description: "To close a ticket",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react) {
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    if (message.channel.name.startsWith("ticket") || message.channel.name.startsWith("bug") || message.channel.name.startsWith("report")){
      let transcriptsChannelID = await database.get('transcriptsChannelID');
      let transcriptsChannel;
      let ticketOwnerID, ticketOwner;
      if(transcriptsChannelID)
        transcriptsChannel = message.guild.channels.cache.get(transcriptsChannelID);
      let logFileLocation;
      if(message.channel.name.startsWith("ticket")){
        ticketOwnerID = message.channel.name.replace("ticket-","");
        ticketOwner = message.guild.members.cache.get(ticketOwnerID);
        logFileLocation = path.join(__dirname, "..", "transcripts", `${message.guild.id}`, `ticket-${ticketOwnerID}.txt`);
      }  
      else if(message.channel.name.startsWith("bug")){
        ticketOwnerID = message.channel.name.replace("bug-","");
        ticketOwner = message.guild.members.cache.get(ticketOwnerID);
        logFileLocation = path.join(__dirname, "..", "transcripts", `${message.guild.id}`, `bug-${ticketOwnerID}.txt`);
      }  
      else if(message.channel.name.startsWith("report")){
        ticketOwnerID = message.channel.name.replace("report-","");
        ticketOwner = message.guild.members.cache.get(ticketOwnerID);
        logFileLocation = path.join(__dirname, "..", "transcripts", `${message.guild.id}`, `report-${ticketOwnerID}.txt`);
      }    
      let isFile = false;
      try{
        let stats = fs.statSync(logFileLocation);
        isFile = true; 
      }catch{
        isFile = false;
      }
      if(!transcriptsChannel){
        embed.setDescription("There is no transcripts channel set, so the ticket transcript will not be saved")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
      }else{
        if(isFile){
          let date = dateBuilder();
          fs.appendFileSync(logFileLocation, `-------------------------------------------\nDate Closed -> ${date}\n-------------------------------------------\n`); 
          await transcriptsChannel.send({
            files: [{
              attachment: logFileLocation,
              name: "transcript.txt"
            }]
          }).catch(error => {/*nothing*/});
          if(ticketOwner){
            embed.setDescription(`Your ticket \`${message.channel.name}\` was closed.\nHere's the transcript of the ticket-`)
              .setColor("YELLOW");
            await ticketOwner.send(embed).catch(error => {/*nothing*/});
            await ticketOwner.send({
              files: [{
                attachment: logFileLocation,
                name: "transcript.txt"
              }]
            }).catch(error => {/*nothing*/});
            setTimeout(function(){
              fs.unlinkSync(logFileLocation);
            }, 5000);
          }
        }else{
          embed.setDescription(`Your ticket \`${message.channel.name}\` was closed.`)
            .setColor("YELLOW");
          await message.author.send(embed).catch(error => {/*DM OFF or blocked*/});
        }
      }
      embed.setDescription("Closing the ticket...")
        .setColor("GREEN");
      await message.channel.send(embed).then((msg) => setTimeout(function(){msg.channel.delete().catch(error => {/*nothing*/});}, 5000)).catch(error => {/*nothing*/});
    }
  }
}