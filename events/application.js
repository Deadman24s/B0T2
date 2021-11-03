let userApplications = {};
let responce;
let success = true;
let guild = {};
let questions = [];
let database;
let applicationLogsChannelID;
let transcriptsChannelID;
let botChannelID;
let canApply;
let prefix = '-';
let Guild;
module.exports = (Discord, client, isAdmin, Keyv, fs, path, react) =>{
  client.on('message', async message => {
    if(message.guild){
      database = new Keyv('sqlite://./databases/database.sqlite', {
        table: `${message.guild.id}`
      });
      let checkPrefix = await database.get("botPrefix");
      if(checkPrefix) prefix = checkPrefix;
    }
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if (message.author.bot){ 
      return;
    }
    let authorId = message.author.id;
    if(message.content === `${prefix}apply`){
      if(!message.guild){
        return;
      }
      guild[authorId] = message.guild.id;
      database = new Keyv('sqlite://./databases/database.sqlite', {
        table: `${guild[authorId]}`
      });
      botChannelID = await database.get("botChannelID");
      if(botChannelID){
        let botChannel = message.guild.channels.cache.get(botChannelID);
        if(botChannel){
          if((message.channel.id != botChannelID) && (!isAdmin(message.member))){
            embed.setDescription(`Please use <#${botChannelID}>.`)
              .setColor("RED");
            await message.reply(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 15000)).catch(error => {/*nothing*/});
            await message.reactions.removeAll();
            react(message, '❌');
            return;
          }
        }else{
          embed.setDescription("The bot channel is not set please set it up first.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {});
          await message.reactions.removeAll();
          react(message, '❌');
          return;
        }
      }
      applicationLogsChannelID = await database.get("applicationLogsChannelID");
      transcriptsChannelID = await database.get("transcriptsChannelID");
      canApply = await database.get("canApply");
      database.on('error', err => console.log('Connection Error', err));
      if(!applicationLogsChannelID){
        embed.setDescription("The application logs channel is not set. Knidly ask the staff to set it first.")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }else{
        let applicationLogsChannel = message.guild.channels.cache.get(applicationLogsChannelID);
        if(!applicationLogsChannel){
          embed.setDescription("The application logs channel is not set. Knidly ask the staff to set it first.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
          await message.reactions.removeAll();
          react(message, '❌');
          return;
        }
      }
      if(!transcriptsChannelID){
        embed.setDescription("The transcripts channel is not set. Knidly ask the staff to set it first.")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }else{
        let transcriptsChannel = message.guild.channels.cache.get(transcriptsChannelID);
        if(!transcriptsChannel){
          embed.setDescription("The transcripts channel is not set. Knidly ask the staff to set it first.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
          await message.reactions.removeAll();
          react(message, '❌');
          return;
        }
      }
      if(!canApply){
        canApply = "false";
        await database.set("canapply", canApply);
      }
      if(canApply == "false"){
        embed.setDescription("Sorry, we are not accepting any applications.")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {/*nothing*/});
        return;
      }
      let blackList = await database.get("applicationBlackList");
      if(blackList){
        let blackListIDs = blackList.split(" ");
        for(let i=0; i<=blackListIDs.length-1; i++){
          if(message.author.id == blackListIDs[i]){
            embed.setDescription("Sorry, You are blacklisted so you cannot apply for staff.")
              .setColor("RED");
            await message.channel.send(embed).catch(error => {/*nothing*/});
            return;
          }
        }
      } 
      for(let i=1; i<=16; i++){
        questions[i] = await database.get(`appQuestion${i}`);
        if(!questions[i]){
          embed.setDescription("All the 16 questions are not set. Please ask the staff to set them first.")
            .setColor("RED");
          await message.author.send(embed).catch(error => {/*nothing*/});
          return;
        }
      }
      if(!(authorId in userApplications)) {
        userApplications[authorId] = { "step" : 1}
        embed.setDescription("Application started!\nPlease check your DM and continue filling the application.")
          .setColor("GREEN");
        let msg = await message.channel.send(embed).catch(error => {/*nothing*/});
        Guild = client.guilds.cache.get(guild[authorId]);
        embed.setAuthor("", Guild.iconURL())
          .setTitle("~~>>>~~ __**STAFF APPLICATION**__ ~~<<<~~")
          .setDescription(`Thank you for choosing to apply for ${Guild.name} staff, Please provide clear and honest answers. Good luck!\n
            -${Guild.name} Staff\n
            You can cancel the application at any time by typing \`cancel\` in the answer.\n\n
            **Question 1**- \`${questions[1]}\``)
          .setColor("YELLOW");  
        await message.author.send(embed).catch( async error =>{
          embed.setDescription("Couldn't send you a message.\nEither your DMs are disabled or I'm blocked from your DM.")
            .setColor("RED");
          await msg.edit(embed).catch(error => {/*nothing*/});
          return;
        });
      }
    }
    else{
      if(message.channel.type === "dm" && authorId in userApplications){
        Guild = client.guilds.cache.get(guild[authorId]);
        if((!guild[authorId]) || (!database)){
          embed.setDescription("There is some bug. Please report it to `ShreshthTiwari#6014`.")
            .setColor("RED");
          await message.author.send(embed).catch(error => {/*nothing*/});
          return;  
        }
        let authorApplication = userApplications[authorId];
        if(message.content == "cancel"){
          embed.setDescription("Application canceled.")
            .setColor("RED");
          await message.author.send(embed).catch(error => {/*nothing*/});
          delete userApplications[authorId];
          delete guild[authorId];
          return;
        }
        else{
          switch(authorApplication.step){
            case 1:
              authorApplication.answer1 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 2:
              authorApplication.answer2 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 3:
              authorApplication.answer3 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 4:
              authorApplication.answer4 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 5:
              authorApplication.answer5 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 6:
              authorApplication.answer6 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 7:
              authorApplication.answer7 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 8:
              authorApplication.answer8 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 9:
              authorApplication.answer9 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 10:
              authorApplication.answer10 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 11:
              authorApplication.answer11 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 12:
              authorApplication.answer12 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 13:
              authorApplication.answer13 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 14:
              authorApplication.answer14 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 15:
              authorApplication.answer15 = message.content;
              embed.setDescription(`**Question ${authorApplication.step + 1}**- \`${questions[authorApplication.step + 1]}\``);
              await message.author.send(embed).catch(error => {/*nothing*/});
              authorApplication.step ++;
              break;
            case 16:
              authorApplication.answer16 = message.content;
              embed.setDescription("**Please cross-check your application.**\nReact with ✅ to send the the application or with ❌ to cancel.");
              responce = await message.author.send(embed).catch(error => {/*nothing*/});
              await responce.react('✅').then(
                responce.react('❌')
              );
              responce.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
                {max: 1, time: 240000 }).then(collected => {
                  if (collected.first().emoji.name === '✅') {
                    let logchannel = client.channels.cache.get(applicationLogsChannelID);
                    const logFileLocation = path.join(__dirname, "..", "applications", `${Guild.id}`, `${message.author.id}.txt`);
                    try{
                      let findFile = fs.statSync(logFileLocation);
                      message.channel.send("You are already having a pending application.\nApplication canceled.").catch(error => {/*nothing*/});
                      return;
                    }catch (error){
                      //This error is good. It means file is not present so we will continue creating the file.
                    }
                    try {
                      fs.writeFile(logFileLocation,
                      "==============================\n" +
                      "NEW APPLICATION" +  
                      "\n==============================\n" +
                      "User- " + message.author.tag +
                      "\nID- " + message.author.id +
                      "\n==============================\n" +
                      "Question 01- " + questions[1] + '\nAnswer 1- ' + authorApplication.answer1 + '\n\n' + 
                      "Question 02- " + questions[2] + '\nAnswer 2- ' + authorApplication.answer2 + '\n\n' + 
                      "Question 03- " + questions[3] + '\nAnswer 3- ' + authorApplication.answer3 + '\n\n' + 
                      "Question 04- " + questions[4] + '\nAnswer 4- ' + authorApplication.answer4 + '\n\n' + 
                      "Question 05- " + questions[5] + '\nAnswer 5- ' + authorApplication.answer5 + '\n\n' + 
                      "Question 06- " + questions[6] + '\nAnswer 6- ' + authorApplication.answer6 + '\n\n' +
                      "Question 07- " + questions[7] + '\nAnswer 7- ' + authorApplication.answer7 + '\n\n' + 
                      "Question 08- " + questions[8] + '\nAnswer 8- ' + authorApplication.answer8 + '\n\n' + 
                      "Question 09- " + questions[9] + '\nAnswer 9- ' + authorApplication.answer9 + '\n\n' + 
                      "Question 10- " + questions[10] + '\nAnswer 10- ' + authorApplication.answer10 + '\n\n' + 
                      "Question 11- " + questions[11] + '\nAnswer 11- ' + authorApplication.answer11 + '\n\n' +
                      "Question 12- " + questions[12] + '\nAnswer 12- ' + authorApplication.answer12 + '\n\n' + 
                      "Question 13- " + questions[13] + '\nAnswer 13- ' + authorApplication.answer13 + '\n\n' +
                      "Question 14- " + questions[14] + '\nAnswer 14- ' + authorApplication.answer14 + '\n\n' + 
                      "Question 15- " + questions[15] + '\nAnswer 15- ' + authorApplication.answer15 + '\n\n' + 
                      "Question 16- " + questions[16] + '\nAnswer 16- ' + authorApplication.answer16 + '\n\n', { flag: 'wx' }, function (err) {
                        if (err){
                          message.author.send(`Error while storing your application.\nPlease report it to the bt dev.\n\`${prefix}bot reportBug <message>\`.`).catch(error => {/*nothing*/});
                          success = false;
                          return;
                        }  
                      });
                    }catch(error){
                      message.author.send(`Error while storing your application.\nPlease report it to the bt dev.\n\`${prefix}bot reportBug <message>\`.`).catch(error => {/*nothing*/});
                    }
                    if(success){
                      logchannel.send({
                        files: [{
                          attachment: logFileLocation,
                          name: `${message.author.id}.txt`
                        }]
                      }).catch(error => {/*nothing*/});
                      let transcriptsChannel = client.channels.cache.get(transcriptsChannelID);
                      transcriptsChannel.send({
                        files: [{
                          attachment: logFileLocation,
                          name: `${message.author.id}.txt`
                        }]
                      }).catch(error => {/*nothing*/});
                      let embed = new Discord.MessageEmbed()
                        .setDescription("**__THANK YOU__**.\n*Your answers have been successfully recorded*.")
                        .setThumbnail(message.author.displayAvatarURL())
                        .setColor(0xFFFF00);
                      message.author.send(embed).catch(error => {/*nothing*/});
                    }
                    else{
                      message.author.send("Application canceled.").catch(error => {/*nothing*/});
                      delete userApplications[authorId];
                      delete guild[authorId];
                      return;    
                    }
                    delete userApplications[authorId];
                    delete guild[authorId];
                  }else{
                    embed.setDescription('Application canceled.')
                      .setColor("RED");
                    message.reply(embed).catch(error => {/*nothing*/});
                    delete userApplications[authorId];
                    delete guild[authorId];
                    return;
                  }
                }).catch(() => {
                  embed.setDescription(`No responce after 4 minutes, Application canceled.\nIf you feel it's a bug, please report it to the bot dev. \`${prefix}bot reportBug <message>\`.`)
                    .setColor("RED");
                  message.reply(embed).catch(error => {/*nothing*/});
                  console.log(`--------------------\nPlease check if ${guild[authorId]} is in applications folder.\n--------------------`);
                  delete userApplications[authorId];
                  delete guild[authorId];
                  return;
                });
              break;        
          }
        }
      }
    }
  });
}
