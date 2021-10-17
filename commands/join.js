const ytdl = require('ytdl-core');

module.exports = {
  name : 'join',
  description : 'make the bot join the VC channel ur in',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    if(message.member.voice.channel) {
      if(!args[0]){
        await message.channel.send("Provide a link also.\n`-join <link>`").catch(error => {/*nothing*/});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      let videoLink = args[0];
      message.member.voice.channel.join().then(connection => {
    	  const stream = ytdl(videoLink, { filter: 'audioonly' });
	      const dispatcher = connection.play(stream);
	      dispatcher.on('finish', () => voiceChannel.leave());
      });  
    } 
    else{
      await message.reply('You need to join a voice channel first!').catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
    }  
  }
}