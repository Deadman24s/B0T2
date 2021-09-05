module.exports = async(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, content) =>{
  if(message.mentions.users.first() == client.user){
    const help = require('../commands/help.js');
    help.run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder);
  }
  else if(content == 'gm') {
    message.channel.send("Good Morning!");
  }
  else if(content == 'gn'){
    message.channel.send("Good Night!");
  }
  else if(content == 'rip'){
    const attachment = new Discord.MessageAttachment('https://i.imgur.com/w3duR07.png');
    message.channel.send(attachment);
  }
  else if(content == 'prefix?'){
    message.channel.send(`My prefix is "**${prefix}**"`);
  }
  else if(content == `f`){
    const fid = await database.get('fEmojiID');
    const f = client.emojis.cache.get(fid);
    if(!f){
      f = client.emojis.cache.get("836091658969808907");
    }
    message.react(f);
  }
  else if(content.includes('haha') || content.includes('hehe') || content.includes('heeh')){
    message.channel.send('https://tenor.com/view/you-mad-bro-u-mad-bro-laugh-ha-ha-ha-are-you-mad-gif-17215780').then((msg) => setTimeout(function(){msg.delete();}, 5000));
  }
}