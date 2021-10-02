module.exports = async(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, queue, ytdl, serverQueue) => {
  let embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTimestamp();
  
  const voiceChannel = message.member.voice.channel;
  if(!voiceChannel){
    embed.setDescription("You need to be in a voice channel to play music!");
    await message.channel.send(embed).catch(error => {});
    return;
  }
  
  const permissions = voiceChannel.permissionsFor(client.user);
  if((!permissions.has("CONNECT")) || (!permissions.has("SPEAK"))) {
    embed.setDescription("I need the permissions to join and speak in your voice channel!");
    await message.channel.send(embed);
    return;
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try{
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    }catch(err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } 
  else{
    serverQueue.songs.push(song);
    embed.setDescription(`${song.title} has been added to the queue!`);
    await message.channel.send(embed);
    return;
  }
}