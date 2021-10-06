const defaultAppQuestions = require("../defaultAppQuestions.json");
module.exports = {
  name: "set",
  description: "set values to variables",

async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder) {
  var embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTimestamp();    
  if(!isAdmin(message.member)){
    await message.reactions.removeAll();
    await message.react('❌').catch(err => {/*nothing*/});
    return;
  }
  if((!args[0]) || args[0]=='help'){
    if(!args[1]){
      embed.setDescription(`
        **Set Help**\n
        **01** ~~»~~ __\`${prefix}set help channels\`__- *To set all the channel variables*.
        **02** ~~»~~ __\`${prefix}set help roles\`__- *To set all the roles variables*.
        **03** ~~»~~ __\`${prefix}set help emojis\`__- *To set all the emojis variables*.
        **04** ~~»~~ __\`${prefix}set help misc\`__- *To set all the misc variables*.
        **05** ~~»~~ __\`${prefix}set help appQuestions\`__- *To set all the 16 application questions*.`);
      }
      else if(args[1] == "channels"){
      embed.setDescription(`
        **Set Help Channels**\n
        **01** ~~»~~ __\`${prefix}set chatLogsChannel <channel>\`__- *To set the chat logs channel*.
        **02** ~~»~~ __\`${prefix}set verificationChannel <channel>\`__- *To set the verification channel*.
        **03** ~~»~~ __\`${prefix}set memeChannel <channel>\`__- *To set the memes channel*.
        **04** ~~»~~ __\`${prefix}set botChannel <channel>\`__- *To set the bot commands channel*.
        **05** ~~»~~ __\`${prefix}set applicationLogsChannel <channel>\`__- *To set the application logs channel*.
        **06** ~~»~~ __\`${prefix}set countingChannel <channel>\`__- *To set the counting channel*.
        **07** ~~»~~ __\`${prefix}set totalMemberCountChannel <channel>\`__- *To set the total members counter channel*.
        **08** ~~»~~ __\`${prefix}set memberCountChannel <channel>\`__- *To set the members counter channel*.
        **09** ~~»~~ __\`${prefix}set botCountChannel <channel>\`__- *To set the bots counter channel*.
        **10** ~~»~~ __\`${prefix}set playerJoinLogsChannel <channel>\`__- *To set the join logs channel*.
        **11** ~~»~~ __\`${prefix}set playerLeaveLogsChannel <channel>\`__- *To set the leave logs channe*.
        **12** ~~»~~ __\`${prefix}set announcementChannel <channel>\`__- *To set the announcement channel*.
        **13** ~~»~~ __\`${prefix}set suggestionChannel <channel>\`__- *To set the suggestion channel*.
        **14** ~~»~~ __\`${prefix}set chatFilterLogsChannel <channel>\`__- *To set the chat filter logs channel*.
        **15** ~~»~~ __\`${prefix}set ticketChannel <channel>\`__- *To set the ticket channel*.
        **16** ~~»~~ __\`${prefix}set transcriptsChannel <channel>\`__- *To set the transcripts channel*.
        **17** ~~»~~ __\`${prefix}set playingStatusChannel <channel>\`__- *To set the minecraft server's playing status channel*.`);
      }
      else if(args[1] == "roles"){
        embed.setDescription(`
          **Set Help Roles**\n
          **01** ~~»~~ __\`${prefix}set pingRole <role>\`__- *To set the ping role*.
          **02** ~~»~~ __\`${prefix}set staffRole <role>\`__- *To set the staffRole*.
          **03** ~~»~~ __\`${prefix}set verifiedRole <role>\`__- *To set the verified role*.
          **04** ~~»~~ __\`${prefix}set extraVerifiedRole <role>\`__- *To add extra verified roles*.
          **05** ~~»~~ __\`${prefix}set mutedRole <role>\`__- *To set the muted role*.`);  
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
          **08** ~~»~~ __\`${prefix}set botCoinName <name>\`__- *To set the bot's coin name*.
          **09** ~~»~~ __\`${prefix}set defaultAppQuestions\`__- *To set the default application questions*.
          **10** ~~»~~ __\`${prefix}set playerJoinMessage <msg>\`__- *To set the player join message*.
          **11** ~~»~~ __\`${prefix}set playerLeaveMessage <msg>\`__- *To set the player leave message*.
          [For player join/leave messages, you can use the placeholders- \`{user}\` \`{username}\` \`{userid}\` \`{usertag}\` \`{guild}\` \`{guildid}\`]`);
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
        await message.channel.send(embed).catch(error => {/*nothing*/});
        return;
      }
      embed.setColor("YELLOW")
      await message.channel.send(embed).catch(error => {/*nothing*/});      
    }
    else{
      let text;
      if(args[0].includes('Channel')){
        let channelID, channel;
        if(!args[1]){
          channelID = message.channel.id;
          channel = message.channel;
        }
        else{
          channelID = args[1];
          channel = message.guild.channels.cache.get(channelID);
          if(!channel){
            channel = message.mentions.channels.first();
            channelID = channel.id;
          }
          if(!channel){
            embed.setDescription("Either the channel ID is incorrect or the channel with that ID no longer exists.")
              .setColor("RED");
            await message.channel.send(embed).catch(error => {/*nothing*/});
            return;
          }
        }
        if(args[0] == "chatLogsChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "chat logs";
        }
        else if(args[0] == "verificationChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "verification"
        }
        else if(args[0] == "memeChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "memes";
        }
        else if(args[0] == "botChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "bot commands"
        }
        else if(args[0] == "applicationLogsChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "applications logs"
        }
        else if(args[0] == "countingChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "counting";
        }
        else if(args[0] == "totalMemberCountChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "total member count";
        }
        else if(args[0] == "memberCountChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "member count";
        }
        else if(args[0] == "botCountChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "bot count";
        }
        else if(args[0] == "playerJoinLogsChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "player join logs";
        }
        else if(args[0] == "playerLeaveLogsChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "player leave logs";
        }
        else if(args[0] == "announcementChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "announcement";
        }
        else if(args[0] == "suggestionChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "suggestion";
        }
        else if(args[0] == "chatFilterLogsChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "chat filter logs";
        }
        else if(args[0] == "ticketChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "ticket";
        }
        else if(args[0] == "transcriptsChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "transcripts";
        }
        else if(args[0] == "playingStatusChannel"){
          await database.set(`${args[0]}ID`, channelID);
          text = "minecraft server playing status";
        }
        else{
          embed.setDescription("There is no subcommand with that name.")
            embed.setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
          return;
        }
        embed.setDescription(`Successfully set "${channel}" as \`${text}\` channel.`);
        await message.channel.send(embed).catch(error => {/*nothing*/});
      }
      else if(args[0].includes("Role")){
        let roleID, role;
        if(!args[1]){
          embed.setDescription("Invalid Syntax.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
        else{
          roleID = args[1];
          role = message.guild.roles.cache.get(roleID);
          if(!role){
            role = message.mentions.roles.first();
            try{
              roleID = role.id;
            }catch{
              roleID = null;
            }
          }
          if(!(role && roleID)){
            embed.setDescription("Either the role is incorrect or the role does not exists.\nNote- `@everyone` is no longer a role so you have to provide the guild ID instead.")
              .setColor("RED");
            await message.channel.send(embed).catch(error => {/*nothing*/}); 
          }
          else{
            if(args[0] == "staffRole"){
              await database.set(`${args[0]}ID`, roleID);
              text = "staff";
            }
            else if(args[0] == "pingRole"){
              await database.set(`${args[0]}ID`, roleID);
              text = "ping";
            }
            else if(args[0] == "verifiedRole"){
              await database.set(`${args[0]}ID`, roleID);
              text = "verified";
            }
            else if(args[0] == "mutedRole"){
              await database.set(`${args[0]}ID`, roleID);
              text = "muted";
            }
            else if(args[0] == "extraVerifiedRole"){
              let verifiedRolesList = await database.get(`${args[0]}ID`);
              verifiedRolesList = verifiedRolesList + ` ${args[1]}`;
              await database.set(`${args[0]}ID`, verifiedRolesList);
              text = "extra verified";
            }
            else{
              embed.setDescription("There is no subcommand with that name.")
                .setColor("RED");
              await message.channel.send(embed).catch(error => {/*nothing*/});
              return;
            }
            embed.setDescription(`Successfully set "${role}" as the \`${text}\` role.`);
            await message.channel.send(embed).catch(error => {/*nothing*/});
          }
        }
      }
      else if(args[0].includes("EmojiID")){
        let emojiID, emoji;
        if(!args[1]){
          embed.setDescription("Invalid Syntax.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
        else{
          emojiID = args[1];
          emoji = client.emojis.cache.get(emojiID);
          if(!emoji){
            embed.setDescription("No emoji found with that ID or the ID is wrong.")
              .setDescription("RED");
            await message.channel.send(embed).catch(error => {/*nothing*/});  
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
              await message.channel.send(embed).catch(error => {/*nothing*/});
              return;
            }
            embed.setDescription(`Successfully set "${emoji}" as the bot's \`${text}\` emoji.`);
            await message.channel.send(embed).catch(error => {/*nothing*/});
          }
        }
      }
      else if(args[0].startsWith("appQuestion")){
        let i, question, found = false;
        if(!args[1]){
          embed.setDescription("Invalid Syntax.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
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
            await message.channel.send(embed).catch(error => {/*nothing*/});
            return;
          }
          embed.setDescription(`Successfully updated the application question ${i}-\n\`\`\`${question}\`\`\``);
          await message.channel.send(embed).catch(error => {/*nothing*/});
        }
      }
      else{
        if(!args[1]){
          if(args[0] == "defaultAppQuestions"){
            await database.set(`appQuestion1`, defaultAppQuestions.q1);
            await database.set(`appQuestion2`, defaultAppQuestions.q2);
            await database.set(`appQuestion3`, defaultAppQuestions.q3);
            await database.set(`appQuestion4`, defaultAppQuestions.q4);
            await database.set(`appQuestion5`, defaultAppQuestions.q5);
            await database.set(`appQuestion6`, defaultAppQuestions.q6);
            await database.set(`appQuestion7`, defaultAppQuestions.q7);
            await database.set(`appQuestion8`, defaultAppQuestions.q8);
            await database.set(`appQuestion9`, defaultAppQuestions.q9);
            await database.set(`appQuestion10`, defaultAppQuestions.q10);
            await database.set(`appQuestion11`, defaultAppQuestions.q11);
            await database.set(`appQuestion12`, defaultAppQuestions.q12);
            await database.set(`appQuestion13`, defaultAppQuestions.q13);
            await database.set(`appQuestion14`, defaultAppQuestions.q14);
            await database.set(`appQuestion15`, defaultAppQuestions.q15);
            await database.set(`appQuestion16`, defaultAppQuestions.q16);
            embed.setDescription(`Successfully saved all the default application Questions.`)
              .setColor("GREEN");
            await message.channel.send(embed).catch(error => {/*nothing*/});
          }else{
            embed.setDescription("Invalid Syntax")
              .setColor("RED");
            await message.channel.send(embed).catch(error => {/*nothing*/});
          }
        }
        else{
          if(args[0] == "IP" || args[0] == "numericIP" || args[0] == "port" || args[0] == "canApply" || args[0] == "welcomeImage" || args[0] == "leaveImage" || args[0] == "botPrefix" || args[0] == "botCoinName"){
            if(args[0] == "canApply" && (!(args[1] === "true" || args[1] === "false"))){
              embed.setDescription("You can se it as \`true\` or \`false\` only.")
                .setColor("RED");
              await message.channel.send(embed).catch(error => {/*nothing*/});
              return;
            }
            else if(args[0] == "port" && isNaN(args[1])){
              embed.setDescription("Port can only be a numeric value.")
                .setColor("RED");
              await message.channel.send(embed).catch(error => {/*nothing*/});
              return;  
            }
            else if(args[0] == "botCoinName"){
              if(args[2]){
                args[1] = args.slice(1).join(" ");
              }
            }
            await database.set(args[0], args[1]);
            embed.setDescription(`Successfully saved the \`${args[0]}\` as \`${args[1]}\` in database.`);
            await message.channel.send(embed).catch(error => {/*nothing*/});
          }
          else if(args[0] == "playerJoinMessage" || args[0] == "playerLeaveMessage"){
            let msg = messageEmojiFinder(client, message, args.slice(1));
            await database.set(args[0], msg);
            embed.setDescription(`Successfully saved the \`${args[0]}\` as-\n ${msg}.`)
              .setColor("GREEN");
            await message.channel.send(embed).catch(error => {/*nothing*/});
          }
          else{
            embed.setDescription("There is no subcommand with that name.")
              .setColor("RED");
            await message.channel.send(embed).catch(error => {/*nothing*/});
          }
        }
      }
    }
  }
}