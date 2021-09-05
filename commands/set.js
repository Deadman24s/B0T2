module.exports = {
  name: "set",
  description: "set values to variables",

async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder) {
  var embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTimestamp();    
  if(!isAdmin(message.member)){
    return;
  }
  if(!isAdmin(message.guild.me)){
    embed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.")
      .setColor("RED");
    await message.channel.send(embed);
    return;
  }
  if(!args[0]){
    embed.setDescription(`What do you want to set?\nUse \`${prefix}set help\`.`)
      .setColor("RED");
    await message.channel.send(embed);
    return;
  }
  if(args[0]=='help'){
    if(!args[1]){
      embed.setDescription(`
        **Set Help**\n
        **01** ~~»~~ __\`${prefix}set help channels\`__- *To set all the channel variables*.
        **02** ~~»~~ __\`${prefix}set help roles\`__- *To set all the roles variables*.
        **03** ~~»~~ __\`${prefix}set help emojis\`__- *To set all the emojis variables*.
        **04** ~~»~~ __\`${prefix}set help misc\`__- *To set all the misc variables*.
        **05** ~~»~~ __\`${prefix}set appQuestions\`__- *To set all the 16 application questions*.`);
      }
      else if(args[1] == "channels"){
      embed.setDescription(`
        **Set Help Channels**\n
        **01** ~~»~~ __\`${prefix}set chatLogsChannelID <ID>\`__- *To set the chat logs channel*.
        **02** ~~»~~ __\`${prefix}set verificationChannelID <ID>\`__- *To set the verification channel*.
        **03** ~~»~~ __\`${prefix}set memeChannelID <ID>\`__- *To set the memes channel*.
        **04** ~~»~~ __\`${prefix}set botChannelID <ID>\`__- *To set the bot commands channel*.
        **05** ~~»~~ __\`${prefix}set applicationLogsChannelID <ID>\`__- *To set the application logs channel*.
        **06** ~~»~~ __\`${prefix}set countingChannelID <ID>\`__- *To set the counting channel*.
        **07** ~~»~~ __\`${prefix}set totalMemberCountChannelID <ID>\`__- *To set the total members counter channel*.
        **08** ~~»~~ __\`${prefix}set memberCountChannelID <ID>\`__- *To set the members counter channel*.
        **09** ~~»~~ __\`${prefix}set botCountChannelID <ID>\`__- *To set the bots counter channel*.
        **10** ~~»~~ __\`${prefix}set playerJoinLogsChannelID <ID>\`__- *To set the join logs channel*.
        **11** ~~»~~ __\`${prefix}set playerLeaveLogsChannelID <ID>\`__- *To set the leave logs channe*.
        **12** ~~»~~ __\`${prefix}set announcementChannelID <ID>\`__- *To set the announcement channel*.
        **13** ~~»~~ __\`${prefix}set suggestionChannelID <ID>\`__- *To set the suggestion channel*.
        **14** ~~»~~ __\`${prefix}set chatFilterLogsChannelID <ID>\`__- *To set the chat filter logs channel*.
        **15** ~~»~~ __\`${prefix}set ticketChannelID <ID>\`__- *To set the ticket channel*.
        **16** ~~»~~ __\`${prefix}set transcriptsChannelID <ID>\`__- *To set the transcripts channel*.
        **17** ~~»~~ __\`${prefix}set playingStatusChannelID <ID>\`__- *To set the minecraft server's playing status channel*.`);
      }
      else if(args[1] == "roles"){
        embed.setDescription(`
          **Set Help Roles**\n
          **01** ~~»~~ __\`${prefix}set pingRoleID <ID>\`__- *To set the ping role*.
          **02** ~~»~~ __\`${prefix}set staffRoleID <ID>\`__- *To set the staffRole*.
          **03** ~~»~~ __\`${prefix}set verifiedRoleID <ID>\`__- *To set the verified role*.
          **04** ~~»~~ __\`${prefix}set mutedRoleID <ID>\`__- *To set the muted role*.`);  
      }
      else if(args[1] == "emojis"){
        embed.setDescription(`
          **Set Help Emojis**\n
          **01** ~~»~~ __\`${prefix}set botCoinEmojiID <ID>\`__- *To set the coin emoji*.
          **02** ~~»~~ __\`${prefix}set upEmojiID <ID>\`__- *To set the up emoji*.
          **03** ~~»~~ __\`${prefix}set updownEmojiID <ID>\`__- *To set the updown emoji*.
          **04** ~~»~~ __\`${prefix}set downEmojiID <ID>\`__- *To set the down emoji*.
          **05** ~~»~~ __\`${prefix}set fEmojiID <ID>\`__- *To set the f emoji*.`);
      }
      else if(args[1] == "misc"){
        embed.setDescription(`
          **Set Help Misc**\n
          **01** ~~»~~ __\`${prefix}set canApply <true/false>\`__- *To turn on or off the ${prefix}apply command*.
          **02** ~~»~~ __\`${prefix}set IP <IP>\`__- *To set the minecraft server IP*.
          **03** ~~»~~ __\`${prefix}set numericIP <numericIP>\`__- *To set the minecraft server numeric IP*.
          **04** ~~»~~ __\`${prefix}set port <port>\`__- *To set the minecraft server port*.
          **05** ~~»~~ __\`${prefix}set welcomeImage <url>\`__- *To set the player welcome image*.
          **06** ~~»~~ __\`${prefix}set leaveImage <url>\`__- *To set the player leave image*.
          **07** ~~»~~ __\`${prefix}set botPrefix <prefix>\`__- *To set the bot's prefix*.
          **08** ~~»~~ __\`${prefix}set botCoinName <name>\`__- *To set the bot's coin name*.`);
      }
      else if(args[1] == "appQuestions"){
        embed.setDescription(`
          **Set Help appQuestions**\n
          **01** ~~»~~ __\`${prefix}set appQuestion<number> <question>\`__- *To set the application question*.
          \`Note- <number> should be between 1 to 16.\`
          **Eg**- \`\`\`${prefix}set appQuestion1 What is your name?\n.\n.\n.\n${prefix}set appQuestion7 Tell us about yourself.\n.\n.\n.\n${prefix}set appQuestion16 Anything else we need to know?\`\`\``);
      }
      else{
        embed.setDescription("There is no subcommand with that name.")
          embed.setColor("RED");
        await message.channel.send(embed);
        return;
      }
      embed.setColor("YELLOW")
      await message.channel.send(embed);      
    }
    else{
      let text;
      if(args[0].includes('ChannelID')){
        let channelID, channel;
        if(!args[1]){
          channelID = message.channel.id;
          channel = message.channel;
        }
        else{
          channelID = args[1];
          channel = message.guild.channels.cache.get(channelID);
          if(!channel){
            embed.setDescription("Either the channel ID is incorrect or the channel does not exists.")
              .setColor("RED");
            await message.channel.send(embed);
            return;
          }
        }
        if(args[0] == "chatLogsChannelID"){
          await database.set(args[0], channelID);
          text = "chat logs";
        }
        else if(args[0] == "verificationChannelID"){
          await database.set(args[0], channelID);
          text = "verification"
        }
        else if(args[0] == "memeChannelID"){
          await database.set(args[0], channelID);
          text = "memes";
        }
        else if(args[0] == "botChannelID"){
          await database.set(args[0], channelID);
          text = "bot commands"
        }
        else if(args[0] == "applicationLogsChannelID"){
          await database.set(args[0], channelID);
          text = "applications logs"
        }
        else if(args[0] == "countingChannelID"){
          await database.set(args[0], channelID);
          text = "counting";
        }
        else if(args[0] == "totalMemberCountChannelID"){
          await database.set(args[0], channelID);
          text = "total member count";
        }
        else if(args[0] == "memberCountChannelID"){
          await database.set(args[0], channelID);
          text = "member count";
        }
        else if(args[0] == "botCountChannelID"){
          await database.set(args[0], channelID);
          text = "bot count";
        }
        else if(args[0] == "playerJoinLogsChannelID"){
          await database.set(args[0], channelID);
          text = "player join logs";
        }
        else if(args[0] == "playerLeaveLogsChannelID"){
          await database.set(args[0], channelID);
          text = "player leave logs";
        }
        else if(args[0] == "announcementChannelID"){
          await database.set(args[0], channelID);
          text = "announcement";
        }
        else if(args[0] == "suggestionChannelID"){
          await database.set(args[0], channelID);
          text = "suggestion";
        }
        else if(args[0] == "chatFilterLogsChannelID"){
          await database.set(args[0], channelID);
          text = "chat filter logs";
        }
        else if(args[0] == "ticketChannelID"){
          await database.set(args[0], channelID);
          text = "ticket";
        }
        else if(args[0] == "transcriptsChannelID"){
          await database.set(args[0], channelID);
          text = "transcripts";
        }
        else if(args[0] == "playingStatusChannelID"){
          await database.set(args[0], channelID);
          text = "minecraft server playing status";
        }
        else{
          embed.setDescription("There is no subcommand with that name.")
            embed.setColor("RED");
          await message.channel.send(embed);
          return;
        }
        embed.setDescription(`Successfully set "${channel}" as \`${text}\` channel.`);
        await message.channel.send(embed);
      }
      else if(args[0].includes("RoleID")){
        let roleID, role;
        if(!args[1]){
          embed.setDescription("Invalid Syntax.")
            .setColor("RED");
          await message.channel.send(embed);
        }
        else{
          roleID = args[1];
          role = message.guild.roles.cache.get(roleID);
          if(!role){
            embed.setDescription("Either the role ID is incorrect or the role does not exists..")
              .setColor("RED");
            await message.channel.send(embed); 
          }
          else{
            if(args[0] == "staffRoleID"){
              await database.set(args[0], roleID);
              text = "staff";
            }
            else if(args[0] == "pingRoleID"){
              await database.set(args[0], roleID);
              text = "ping";
            }
            else if(args[0] == "verifiedRoleID"){
              await database.set(args[0], roleID);
              text = "verified";
            }
            else if(args[0] == "mutedRoleID"){
              await database.set(args[0], roleID);
              text = "muted";
            }
            else{
              embed.setDescription("There is no subcommand with that name.")
                .setColor("RED");
              await message.channel.send(embed);
              return;
            }
            embed.setDescription(`Successfully set "${role}" as the \`${text}\` role.`);
            await message.channel.send(embed);
          }
        }
      }
      else if(args[0].includes("EmojiID")){
        let emojiID, emoji;
        if(!args[1]){
          embed.setDescription("Invalid Syntax.")
            .setColor("RED");
          await message.channel.send(embed);
        }
        else{
          emojiID = args[1];
          emoji = client.emojis.cache.get(emojiID);
          if(!emoji){
            embed.setDescription("No emoji found with that ID or the ID is wrong.")
              .setDescription("RED");
            await message.channel.send(embed);  
          }
          else{
            if(args[0] == "botCoinEmojiID"){
              await database.set(args[0], emojiID);
              text = "coin";
            }
            else if(args[0] == "upEmojiID"){
              await database.set(args[0], emojiID);
              text = "up";
            }
            else if(args[0] == "updownEmojiID"){
              await database.set(args[0], emojiID);
              text = "updown";
            }
            else if(args[0] == "downEmojiID"){
              await database.set(args[0], emojiID);
              text = "down";
            }
            else if(args[0] == "fEmojiID"){
              await database.set(args[0], emojiID);
              text = "f";
            }
            else{
              embed.setDescription("There is no subcommand with that name.")
                .setColor("RED");
              await message.channel.send(embed);
              return;
            }
            embed.setDescription(`Successfully set "${emoji}" as the bot's \`${text}\` emoji.`);
            await message.channel.send(embed);
          }
        }
      }
      else if(args[0].startsWith("appQuestion")){
        let i, question, found = false;
        if(!args[1]){
          embed.setDescription("Invalid Syntax.")
            .setColor("RED");
          await message.channel.send(embed);
        }
        else{
          question = args.slice(1).join(" ");
          for(i = 1; i<=16; i++){
            if(args[0] == `appQuestion${i}`){
              await database.set(args[0], question);
              found = true;
              break;
            }
          }
          if(!found){
            embed.setDescription("There is no subcommand with that name.")
              .setColor("RED");
            await message.channel.send(embed);
            return;
          }
          embed.setDescription(`Successfully updated the application question ${i}-\n\`\`\`${question}\`\`\``);
          await message.channel.send(embed);
        }
      }
      else{
        if(!args[1]){
          embed.setDescription("Invalid Syntax")
            .setColor("RED");
          await message.channel.send(embed);
        }
        else{
          if(args[0] == "IP" || args[0] == "numericIP" || args[0] == "port" || args[0] == "canApply" || args[0] == "welcomeImage" || args[0] == "leaveImage" || args[0] == "botPrefix" || args[0] == "botCoinName"){
            if(args[0] == "canApply" && (!(args[1] === "true" || args[1] === "false"))){
              embed.setDescription("You can se it as \`true\` or \`false\` only.")
                .setColor("RED");
              await message.channel.send(embed);
              return;
            }
            else if(args[0] == "port" && isNaN(args[1])){
              embed.setDescription("Port can only be a numeric value.")
                .setColor("RED");
              await message.channel.send(embed);
              return;  
            }
            else if(args[0] == "botCoinName"){
              if(args[2]){
                args[1] = args.slice(1).join(" ");
              }
            }
            await database.set(args[0], args[1]);
            embed.setDescription(`Successfully saved the \`${args[0]}\` as \`${args[1]}\` in database.`);
            await message.channel.send(embed);
          }
          else{
            embed.setDescription("There is no subcommand with that name.")
              .setColor("RED");
            await message.channel.send(embed);
          }
        }
      }
    }
  }
}