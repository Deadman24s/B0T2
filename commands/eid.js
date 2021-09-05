module.exports = {
  name : 'eid',
  description : 'to get of an emoji',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    if(!(message.author.id == "564106279862140938" || message.author.id == "785663407198044220")){
      return;
    }
    let emojiName;
    if(args[0].startsWith(':') && args[0].endsWith(':')){
      emojiName = args[0].slice(1, -1);
    }
    else{
      return;
    }
    let emoji = client.emojis.cache.find(e => e.name == emojiName);
    if(emoji){
      await message.channel.send('`' + emoji.id + '`').catch(console.error());
    }
    else{ 
      return;
    }
  }
}