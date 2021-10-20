const https = require('https');
let subReddits = ["savagememes", "OSHA", "BikiniBottomTwitter", "fakehistoryporn", "ScottishPeopleTwitter", "me_irl", "skyrimskills_irl", "wellthatsucks", "funny", "youdontsurf", "prequelmemes", "thatHappened", "ATBGE", "WeWantPlates", "thecanopener", "JustRolledIntoTheSea", "AnimatedStarWarsMemes", "MildlyVandalised", "misleadingthumbnails", "BlackPeopleTwitter", "notmyjob", "whatcouldgowrong", "crappydesign", "youtubehaiku", "BigBrother", "Archer"];
let n = Math.floor(Math.random() * subReddits.length);
let url = `https://www.reddit.com/r/memes/hot/.json?limit=100`;
if(subReddits[n]){
  url = `https://www.reddit.com/r/${subReddits[n]}/hot/.json?limit=100`;
}
n = Math.floor(Math.random() * n);

module.exports = {
  name : 'meme',
  description : 'for memes xD',
  
  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp();
    const memeChannelID = await database.get("memeChannelID");
    const botChannelID = await database.get("botChannelID");
    if(!memeChannelID){
      embed.setDescription('The meme channel is not setup. Kindly ask the staff to setup is first.')
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    const memeChannel = message.guild.channels.cache.get(memeChannelID);
    if((!memeChannel) && (message.channel.id != botChannelID)){
      embed.setDescription('The meme channel is not setup. Kindly ask the staff to setup is first.')
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    https.get(url, (result) => {
      let body = '';
      result.on('data', (chunk) =>{
        body += chunk;
      });
      result.on('end', async() => {
        let response = JSON.parse(body);
        let index = response.data.children[Math.floor(Math.random() * 99) + 1].data;
        if(index.post_hint == "image"){
          let image = index.preview.images[0].source.url.replace('&amp;', '&');
          let text = index.selftext;
          let title = index.title;
          let link = 'https://reddit.com' + index.permalink;
          let subRedditName = index.subreddit_name_prefixed;
          embed.setTitle(subRedditName)
            .setImage(image)
            .setColor(0xFFFF00)
            .setDescription(`[${title}](${link})`)
            .setURL(`https://reddit.com/${subRedditName}`)
          await message.channel.send(embed).catch(error => {/*nothing*/});
          n = Math.floor(Math.random() * subReddits.length);
        }else{
          embed.setDescription("Memes over. Goto bed.")
            .setFooter(`Try using ${prefix}meme again.`);
          await message.channel.send(embed).catch(error => {});
        }
      });
    });
  }
}