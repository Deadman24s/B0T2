module.exports = async(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, content) =>{
  if(content == 'gm') {
    await message.channel.send("Good Morning!");
  }
  else if(content == 'gn'){
    await message.channel.send("Good Night!");
  }
  else if(content == 'rip'){
    const attachment = new Discord.MessageAttachment('https://i.imgur.com/w3duR07.png');
    await message.channel.send(attachment);
  }
  else if(content == 'prefix?'){
    await message.channel.send(`My prefix is "**${prefix}**"`);
  }
  else if(content == `f`){
    const fid = await database.get('fEmojiID');
    let f = client.emojis.cache.get(fid);
    if(!f){
      f = client.emojis.cache.get("836091658969808907");
    }
    await message.react(f);
  }
  else if(content.includes('haha') || content.includes('hehe') || content.includes('heeh')){
    await message.channel.send('https://tenor.com/view/you-mad-bro-u-mad-bro-laugh-ha-ha-ha-are-you-mad-gif-17215780').then((msg) => setTimeout(function(){msg.delete();}, 5000));
  }
  else if(content == "hi" || content == "hello" || content == "helo" || content == "hemlo" || content == "hey"){
    await message.channel.send("Hemlo");
  }
}