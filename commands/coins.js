module.exports = {
  name : 'coins',
  description : 'to get coins info',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    const coinEmojiID =  await database.get('botCoinEmojiID');
    const coinEmoji = client.emojis.cache.get(coinEmojiID);
    let coinText = await database.get('botCoinName');
    if(!coinEmoji){
      coinEmoji = "🪙";
    }
    if(!coinText){
      coinText = "Bot Coin";
    }
    let person, coins; 
    if(!args[0]){
      coins = await database.get(`${message.author.id} coins`);
      if(!coins){
        coins = 0;
        await database.set(`${message.author.id} coins`, coins);
      }
      if(coins > 1)
        coinText = coinText + 's';
      embed.setAuthor(message.author.username)
        .setDescription(`${coinEmoji} **${coins.toFixed(2)}** ${coinText}`)
        .setThumbnail(message.author.displayAvatarURL());
      await message.channel.send(embed);
    }else{
      person = personFinder(message, args[0], "user");
      if(person === "not found"){
        embed.setDescription("Wrong user provided or user doesn't exists in this server.")
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }  
      coins = await database.get(`${person.id} coins`);
      if(!coins){
        coins = 0;
        await database.set(`${person.id} coins`, coins);
      }
      if(coins > 1)
        coinText = coinText + 's';
      embed.setAuthor(person.username)
        .setDescription(`${coinEmoji} **${coins.toFixed(2)}** ${coinText}`)
        .setThumbnail(person.displayAvatarURL());
      await message.channel.send(embed);
    }
  }
}