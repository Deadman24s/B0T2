module.exports = async(message, database, fs, path, dateBuilder) =>{
  if(message.channel.name.startsWith("ticket") || message.channel.name.startsWith("bug") || message.channel.name.startsWith("report")){
    let ticketOwnerID, ticketOwner;
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
    fs.appendFileSync(logFileLocation, `[${dateBuilder()}]\n${message.author.tag + ' || ' + message.author.id} -> ${message.content}\n`);
  }
}