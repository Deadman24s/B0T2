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
  for(let i=1; i<=args.length; i++){
    t = t.replace(" \n ", "\n").replace(": \n", ":\n").replace("\n :", "\n:").replace(": \n :", ":\n:");
  }
  return t; 
}