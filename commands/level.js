const levelBarBuilder = require('../builders/levelBarBuilder.js');
const e = require("../emojiIDs.json");

module.exports = {
  name : 'level',
  description : 'to check your level',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react, helpText){
    if(!helpText){
      helpText = "level";
    }
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp();
    const coinEmojiID =  await database.get('botCoinEmojiID');
    let coinEmoji = client.emojis.cache.get(coinEmojiID);
    if(!coinEmoji){
      coinEmoji = client.emojis.cache.get(e.coinEmoji);
    }
    let coinText = await database.get('botCoinName');
    let coins;
    let lvl, points, rank, person, maxPoints, pointsPercentage;
    if(args[0] == "help"){
      if(isAdmin(message.member)){
        embed.setDescription(`**Level Help**
          **01** ~~»~~ __\`${prefix}${helpText} help\`__- *To get this help message*.
          **02** ~~»~~ __\`${prefix}${helpText}\`__- *To see your level*.
          **03** ~~»~~ __\`${prefix}${helpText} <user>\`__- *To see a user's level*.
          **04** ~~»~~ __\`${prefix}${helpText} set <user> <leve>\`__- *To set a user's level*.`)
        .setColor("YELLOW");
      }
      else{
        embed.setDescription(`**Level Help**
          **01** ~~»~~ __\`${prefix}${helpText} help\`__- *To get this help message*.
          **02** ~~»~~ __\`${prefix}${helpText}\`__- *To see your level*.
          **03** ~~»~~ __\`${prefix}${helpText} <user>\`__- *To see a user's level*.`)
        .setColor("YELLOW");
        }
      await message.channel.send(embed).catch(error => {/*nothing*/});
    }
    else{
      if(!args[1]){
        if(args[0]){
          person = personFinder(message, args[0], "user");
          if(!person){
            embed.setDescription("Wrong user provided or user doesn't exists in this server.")
              .setColor("RED");
            await message.channel.send(embed).catch(error => {/*nothing*/});
            await message.reactions.removeAll();
            react(message, '❌');
            return;
          } 
        }
        else{
          person = message.author;
        }
        if(!coinText){
          coinText = "Bot Coin";
        }
        lvl = await database.get(`${person.id} lvl`) * 1;
        rank = await database.get(`${person.id} rank`) * 1;
        points = await database.get(`${person.id} points`) * 1.0;
        coins = await database.get(`${person.id} coins`) * 1;
        if((!coins) || coins <= 0)
          coins = 0;
        if((!lvl) || lvl <= 0)
          lvl = 1;
        if((!rank) || rank <= 0){
          rank = message.guild.members.cache.size;
          await database.set(`${person.id} rank`, rank);
        }  
        if((!points) || points < 0)  
          points = 0;
        if(coins >= 1)
          coinText = coinText + 's';  
        maxPoints = lvl * 55;
        pointsPercentage = (points*100)/maxPoints;
        embed.setAuthor(person.username)
          .setTitle(`**LEVEL** ${lvl}`)
          .setDescription(`**${points.toFixed(3)}**  ${levelBarBuilder(client, pointsPercentage)}  **${maxPoints.toFixed(3)}**\n\n${coinEmoji} **${coins.toFixed(3)}** ${coinText}`)
          .setThumbnail(person.displayAvatarURL())
          .setFooter(`Rank- #${rank}`);
        await message.channel.send(embed).catch(error => {/*nothing*/});
      }
      if(args[0] && args[0].toLowerCase() == "set"){
        if(!isAdmin(message.member)){
          await message.reactions.removeAll();
          react(message, '❌');
          return;
        }
        if(!args[1])
          person = message.author;
        else{
          person = personFinder(message, args[0], "user");
          if(!person){
            embed.setDescription("Wrong user provided or user doesn't exists in this server.")
              .setColor("RED");
            await message.channel.send(embed).catch(error => {/*nothing*/});
            await message.reactions.removeAll();
            react(message, '❌');
            return;
          }   
        }
        lvl = await database.get(`${person.id} lvl`) * 1;
        rank = await database.get(`${person.id} rank`) * 1;
        points = 0;
        if(coins > 1)
          coinText = coinText + 's';  
        coins = await database.get(`${message.author.id} coins`) * 1;
        if((!coins) || coins <= 0)
          coins = 0;
        if((!lvl) || lvl <= 0)
          lvl = 1;
        if((!rank) || rank <= 0){
          rank = message.guild.members.cache.size;
          await database.set(`${person.id} rank`, rank);
        }  
        if((!points) || points < 0)  
          points = 0;  
        if(!args[2]){
          embed.setDescription("please provide a value to add.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
          await message.reactions.removeAll();
          react(message, '❌');
          return;
        }
        if(isNaN(args[2])){
          embed.setDescription("Please provide a numeric value.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {/*nothing*/});
          await message.reactions.removeAll();
          react(message, '❌');
          return;
        }
        args[2] *= 1;
        lvl = args[2];
        if(lvl <= 0)
          lvl = 1;
        maxPoints = lvl * 55;
        await database.set(`${person.id} lvl`, lvl)
        await database.set(`${person.id} points`, points)
        pointsPercentage = (points*100)/maxPoints;
        embed.setAuthor(person.username)
          .setTitle(`**LEVEL** ${lvl}`)
          .setDescription(`**${points.toFixed(3)}**  ${levelBarBuilder(client, pointsPercentage)}  **${maxPoints.toFixed(3)}**\n\n${coinEmoji} **${coins.toFixed(3)}** ${coinText}`)
          .setThumbnail(person.displayAvatarURL());
        await message.channel.send(embed).catch(error => {/*nothing*/});
      }
    }
  }
}