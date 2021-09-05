const https = require('https');
let url = 'https://www.reddit.com/r/meme/hot/.json?limit=100';

module.exports = {
  name : 'meme',
  description : 'for memes xD',
  
  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp();
    const memeChannelID = await database.get("memeChannelID");
    if(!memeChannelID){
      embed.setDescription('The meme channel is not setup. Kindly ask the staff to setup is first.')
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    const memeChannel = message.guild.channels.cache.get(memeChannelID);
    if(!memeChannel){
      embed.setDescription('The meme channel is not setup. Kindly ask the staff to setup is first.')
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    if(args[1]){
      url = `https://www.reddit.com/r/${args[1]}/hot/.json?limit=100`;
    }
    if(message.channel.id != memeChannelID) return;  
    https.get(url, (result) => {
      let body = '';
      result.on('data', (chunk) =>{
        body += chunk;
      });
      result.on('end', async() => {
        let response = JSON.parse(body);
        let index = response.data.children[Math.floor(Math.random() * 99) + 1].data;
        if(index.post_hint !== 'image'){
          let text = index.selftext;
          embed.setTitle(subRedditName)
            .setDescription(`[${title}](${link})\n\n${text}`)
            .setURL(`https://reddit.com/${subRedditName}`);
          await message.channel.send(embed);  
        }
        let image = index.preview.images[0].source.url.replace('&amp;', '&')
        let title = index.title
        let link = 'https://reddit.com' + index.permalink
        let subRedditName = index.subreddit_name_prefixed
        if (index.post_hint !== 'image') {
          embed.setTitle(subRedditName)
            .setDescription(`[${title}](${link})\n\n${text}`)
            .setURL(`https://reddit.com/${subRedditName}`);
          await message.channel.send(embed);
        }
        else{
          embed.setTitle(subRedditName)
            .setImage(image)
            .setColor(0xFFFF00)
            .setDescription(`[${title}](${link})`)
            .setURL(`https://reddit.com/${subRedditName}`)
          await message.channel.send(embed);
        }
        });
    });
  }
}