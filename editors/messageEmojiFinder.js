module.exports = (client, message, args) => {
  for(let i=0; i< args.length; i++){
    if(args[i].startsWith(':') && args[i].endsWith(':')){
      let emojiName = args[i].slice(1, -1);
      let emoji = message.guild.emojis.cache.find(e => e.name == emojiName);
      if(!emoji)
        emoji = client.emojis.cache.find(e => e.name == emojiName);
      if(emoji){
        args[i] = emoji;    
      }
    }
  }
  let t = args.join(" ");
  t = t.replace(" \n ", "\n");
  t = t.replace(": \n", ":\n");
  t = t.replace("\n :", "\n:");
  t = t.replace(": \n :", ":\n:");
  return t; 
}