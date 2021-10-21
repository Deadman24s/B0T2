module.exports = {
  name : 'help',
  description : 'commands list',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setFooter('Author- ShreshthTiwari#6014')
      .setThumbnail(message.author.displayAvatarURL());
    
    embed.setTitle(`${client.user.username} Bot Member Help`)
      .setDescription(`
        **${prefix}afk <message>** » __To set your AFK status__.
        **${prefix}apply** » __Apply for server staff__.
        **${prefix}avater <user>** » __Get avatar of a member__.[*alias* - **pfp**.]
        **${prefix}bot** » __Bot related command__.
        **${prefix}coins <user>** » __To check your coins__.
        **${prefix}create** » __Create a new ticket__.[*alias* - **new**, **t**, **ticket**.]
        **${prefix}help** » __Get this commands help message__.
        **${prefix}info <user>** » __Get info of a member__.[*alias* - **userinfo**.]
        **${prefix}ip** » __Get minecraft server IP__.
        **${prefix}join** » __Make the bot join your VC__.
        **${prefix}level <user>** » __To check your level__.[*alias* - **lvl**.]
        **${prefix}leveltop <page>** » __To check the leaderboard__.[*alias* - **lvltop**.]
        **${prefix}meme** » __Funny memes__.
        **${prefix}ping** » __Get bot's ping__.
        **${prefix}status** » __Get the minecraft server status__.
        **${prefix}suggest <suggestion>** » __Suggest something__.[*alias* - **suggestion**.]
        **${prefix}verify** » __Verify yourself in verification channel__.
      `)
      .setColor("RANDOM");
    await message.channel.send(embed).catch( error =>{});
    if(isAdmin(message.member) || message.member.id == "564106279862140938"){
      embed.setTitle(`${client.user.username} Bot Admin Help`)
        .setDescription(`
          **${prefix}add <user>** » __Add a member to a ticket__.
          **${prefix}announce <anouncement>** » __Announce a message__.
          **${prefix}application** » __Application setup__.
          **${prefix}badword help** » __Edit badwords list for chat filtering__.
          **${prefix}ban <user>** » __Ban a member__.
          **${prefix}cc** » __Create a custom command__.
          **${prefix}close** » __Close a ticket__.
          **${prefix}clear <amount>** » __Delete messages__.
          **${prefix}close** » __Close a ticket__.
          **${prefix}embed <message>** » __Send an embed message__.
          **${prefix}emojis <page>** » __Get list of emojis bot has access to__.
          **${prefix}kick <user>** » __Kick a member from the server__.
          **${prefix}members** » __List members present in the server__.
          **${prefix}msg <user> <message>** » __Private message a member as bot__.
          **${prefix}msge <user> <message>** » __Message an embed to a member as bot__.
          **${prefix}mute <user>** » __Mute a member__.
          **${prefix}nuke <channel>** » __Clean the channel with a nuke__.
          **${prefix}remove <user>** » __Remove a member from the ticket__.
          **${prefix}say <message>** » __Say a message as the bot__.
          **${prefix}set help** » __Set variables for the bot__.
          **${prefix}sping <user>** » __make the bot spam ping a person__.
          **${prefix}swear help** » __Edit swear list for chat filtering__.
          **${prefix}testjoin** » __To create a join and leave message for you__.
          **${prefix}unmute <user>** » __Unmute a member__.
          **${prefix}warn <user>** » __To warn a member__.
          **${prefix}warns <user>** » __Check warns of a member__.
        `)
        .setColor("RANDOM");
        await message.channel.send(embed).catch( error =>{});
    }
  }
}