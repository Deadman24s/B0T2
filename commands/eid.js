module.exports = {
  name : 'eid',
  description : 'to get ID of an emoji',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let emojiName;
    if(args[0].startsWith(':') && args[0].endsWith(':')){
      emojiName = args[0].slice(1, -1);
    }
    else{
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let emoji = client.emojis.cache.find(e => e.name == emojiName);
    if(emoji){
      await message.channel.send(`${emoji} [\`${emoji.id}\`]`).catch(error => {/*nothing*/});
    }
    else{ 
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
  }
}