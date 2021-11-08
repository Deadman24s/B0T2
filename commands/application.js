const fs = require("fs");
module.exports = {
  name : 'application',
  description : 'to accept/reject an application',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    if((!args[0]) || args[0] == "help"){
      embed.setDescription(`**Application Command Help**-\n
        **01** ~~»~~ __\`${prefix}application reject <user> <reason>\`__- *To reject an application*.
        **02** ~~»~~ __\`${prefix}application accept <user> <message>\`__- *To accept an application*.
        **03** ~~»~~ __\`${prefix}application ignore <user> <reason>\`__- *To ignore an application*.
        **04** ~~»~~ __\`${prefix}application blacklist\`__- *To view the application blacklist*
        **05** ~~»~~ __\`${prefix}application blacklist add <userID>\`__- *To add a user's ID in the blacklist*
        **06** ~~»~~ __\`${prefix}application blacklist remove <userID>\`__- *To remove a user's ID from the blacklist*`);
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
    if(args[0].toLowerCase() == "reject" || args[0].toLowerCase() == "accept" || args[0].toLowerCase() == "ignore"){
      if(!args[1]){
        embed.setDescription("Please provide a user")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      let applicant = personFinder(message, args[1], "user");
      if(applicant === "not found"){
        embed.setDescription("Wrong user provided or user doesn't exist in this server.")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;  
      }
      let reason = args.slice(2).join(" ");
      if(!reason){
        reason = "Not Provided."
      }
      let checkFile;
      try{
        checkFile = fs.statSync(`./applications/${message.guild.id}/${applicant.id}.txt`);
      }catch{
        //nothing
      }
      if(checkFile){
        fs.unlink(`./applications/${message.guild.id}/${applicant.id}.txt`, (err) => {
          if (err) throw err;
        });
        if(args[0].toLowerCase() == "reject"){
          embed.setDescription(`Your application got rejected.\nReason- \`${reason}\``)
            .setColor("RED");
          await applicant.send(embed).catch(error => {/*nothing*/});
          embed.setDescription(`Sucessfully rejected the application of ${applicant.tag}[${applicant.id}]\nReason-${reason}`)
            .setColor("GREEN");
          await message.channel.send(embed).catch(error => {/*nothing*/}); 
        }
        else if(args[0].toLowerCase() == "accept"){
          embed.setDescription(`Your application was accepted.🥳\nMessage from staff- \`${reason}\``)
            .setColor("GREEN")
          await applicant.send(embed).catch(error => {/*nothing*/});
          embed.setDescription(`Sucessfully accepted the application of ${applicant.tag}[${applicant.id}]\nMessage from staff-${reason}`)
            .setColor("GREEN");
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
        else if(args[0].toLowerCase() == "ignore"){
          embed.setDescription(`Sucessfully ignored the application of ${applicant.tag}[${applicant.id}]\nReason-${reason}`)
            .setColor("GREEN");
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
      }
      else{
        embed.setDescription("There is no new application from that user.")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
      }
    }
    else if(args[0].toLowerCase() == "blacklist"){
      let blackList = await database.get("applicationBlackList");
      let blackListIDs;
      if(!blackList){
        blackList = " ";
        await database.set("applicationBlackList", blackList);
      }
      blackListIDs = blackList.split(" ");
      if(!args[1]){
        blackList = blackListIDs.join("\n");
        embed.setDescription(`Blacklisted IDs- ${blackList}`)
          .setColor("RANDOM");
        await message.channel.send(embed).catch(error => {/*nothing*/});
      }
      else{
        if(args[1].toLowerCase() == "remove"){
          for(let i=0; i<=blackListIDs.length-1; i++){
            if(args[2] == blackListIDs[i]){
              if(blackListIDs.length > 1){
                for(let j=i; j<=blackListIDs.length-2; j++){
                  blackListIDs[j] = blackListIDs[j+1];
                }
              }
              let t = blackListIDs.pop();
              blackList = blackListIDs.join(" ");
              await database.set("applicationBlackList", blackList);
              embed.setDescription(`Successfully removed ${args[2]} from the application blacklist.`)
                .setColor("GREEN");
              await message.channel.send(embed).catch(error => {/*nothing*/});
              return;
            }
          }
          embed.setDescription(`That ID (${args[2]}) is not blacklisted.`)
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
        else if(args[1].toLowerCase() == "add"){
          for(let i=0; i<=blackListIDs.length-1; i++){
            if(args[2] == blackListIDs[i]){
              embed.setDescription(`ID (${args[2]}) is already blacklisted.`)
                .setColor("RED");
              await message.channel.send(embed).catch(error => {/*nothing*/});
              await message.reactions.removeAll();
              react(message, '❌');
              return;
            }
          }
          blackListIDs[blackListIDs.length] = args[2];
          blackList = blackListIDs.join(" ");
          await database.set("applicationBlackList", blackList);
          embed.setDescription(`Successfully added ${args[2]} to the application blacklist.`)
            .setColor("GREEN");
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
      }
    }
  }
}