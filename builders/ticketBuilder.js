module.exports = async(Discord, message, fs, path, date, ticketReason, person, staffRoleID) => {
  let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTimestamp();
  async function ticketCreator(ticketTypeSelector, ticketType, ticketTitle, ticketTypeText){
    let tempChannel, logFileLocation;
    tempChannel = message.guild.channels.cache.find(ch => ch.name === `${ticketType}-${message.author.id}`);
    if(tempChannel){
      embed.setDescription(`You already have a ticket opened (__<#${tempChannel.id}>__). Please close it before creating a new ticket.`)
        .setColor("RED");       
      await message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete();}, 10000));
      await ticketTypeSelector.delete();
      await message.delete();
      return;
    }
    await message.guild.channels.create(`${ticketType}-${person}`,{ 
      reason: ticketReason,
      permissionOverwrites: [
        {
          id: `${message.author.id}`,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'USE_EXTERNAL_EMOJIS', 'CHANGE_NICKNAME',]
        },
        {
          id: `${message.guild.id}`,
          deny: ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS' ]
        },
        {
          id: staffRoleID,
          allow: ['ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS' ]
        },
      ],
    }).then(async ticketchannel =>{
      embed.setAuthor(`By- ${message.author.username}`)
        .setThumbnail(message.author.displayAvatarURL())
        .setColor("YELLOW")
        .setTitle(ticketTitle)
        .setDescription(`ID- ${message.author.id}
          Tag- ${message.author.tag}
          Reason- ${ticketReason}`);
      let directoryLocation = path.join(__dirname, "..", "transcripts", `${message.guild.id}`);
      fs.mkdir(directoryLocation, (err) => {});
      logFileLocation = path.join(__dirname, "..", "transcripts", `${message.guild.id}`, `${ticketType}-${message.author.id}.txt`);  
      await fs.appendFileSync(logFileLocation, `-------------------------------------------\nUser -> ${message.author.tag + ' || ' + message.author.id}.\nType -> ${ticketTypeText}.\nReason -> ${ticketReason}.\nDate Opened -> ${date}.\n-------------------------------------------\n`);    
      await ticketchannel.send(embed);
      await ticketchannel.send(`<@${message.author.id}> <@&${staffRoleID}>`).then((msg) => setTimeout(function(){msg.delete();}, 500));
    });
    embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTimestamp();
    embed.setDescription("Successfully opened a ticket.")
      .setColor("GREEN");
    await message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete();}, 10000));
    await ticketTypeSelector.delete();
    await message.delete();  
  }
  embed.setTitle("**Ticket Type**")
    .setDescription("1️⃣ Normal ticket.\n2️⃣ Bug Report.\n3️⃣ Player Report.\n❌ Close.");
  let ticketTypeSelector = await message.channel.send(embed);
  embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTimestamp();
  await ticketTypeSelector.react('1️⃣').then(
    ticketTypeSelector.react('2️⃣'),
    ticketTypeSelector.react('3️⃣'),
    ticketTypeSelector.react('❌')
  );
  ticketTypeSelector.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '3️⃣' || reaction.emoji.name == '❌'),
    { max: 1, time: 30000 }).then(async collected => {
      if (collected.first().emoji.name == '1️⃣') {
        ticketCreator(ticketTypeSelector, 'ticket', 'New Ticket', 'Normal Ticket');
      }
      else if (collected.first().emoji.name == '2️⃣') {
        ticketCreator(ticketTypeSelector, 'bug', 'Bug Report', 'Bug Report Ticket');
      }
      else if (collected.first().emoji.name == '3️⃣') {
        ticketCreator(ticketTypeSelector, 'report', 'Player Report', 'Player Report Ticket');
      } 
      else{
        await ticketTypeSelector.delete();
        await message.delete();
      }
    }).catch(async() => {
      await ticketTypeSelector.delete();
      await message.delete();
  });
}