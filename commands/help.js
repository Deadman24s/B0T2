module.exports = {
  name : 'help',
  description : 'commands list',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setTimestamp()
      .setFooter('Author- ShreshthTiwari#6014')
      .setThumbnail(message.author.displayAvatarURL());
    
    embed.setDescription(":mailbox_with_mail: Sending you a DM with all the available bot commands.");
    let me = await message.channel.send(embed); 
    
    embed.setTitle(`${client.user.username} Bot Member Help`)
      .setDescription(`
        **${prefix}apply** » __Apply for server staff__.
        **${prefix}avater** » __Get avatar of a member__.[*alias* - **pfp**.]
        **${prefix}coins** » __To check your coins__.
        **${prefix}create** » __Create a new ticket__.[*alias* - **new**, **t**, **ticket**.]
        **${prefix}help** » __Get this commands help message__.
        **${prefix}ip** » __Get minecraft server IP__.
        **${prefix}join** » __Make the bot join your VC__.
        **${prefix}level** » __To check your level__.[*alias* - **lvl**.]
        **${prefix}userinfo** » __Get info of a member__.
        **${prefix}meme** » __Funny memes__.
        **${prefix}ping** » __Get bot's ping__.
        **${prefix}status** » __Get the minecraft server status__.
        **${prefix}suggest** » __Suggest something__.[*alias* - **suggestion**.]
        **${prefix}verify** » __Verify yourself in verification channel__.
        **${prefix}version** » __Get minecraft server's version__.
        **${prefix}vote** » __Get minecraft server voting sites list__.
      `)
      .setColor("RANDOM");
    let blocked = false;
    await message.author.send(embed).catch( error =>{      me.edit(embed);
      blocked = true;
    });
    if(blocked){
      embed.setTitle("")
        .setDescription("Either your DMs are off or I'm blocked.")
        .setColor("RED");
      message.reactions.removeAll();
      message.react('❌').catch(err => {/*nothing*/});
      me.edit(embed);
    }
    if(isAdmin(message.member)){
      embed.setTitle(`${client.user.username} Bot Admin Help`)
        .setDescription(`
          **${prefix}add** » __Add a member to a ticket__.
          **${prefix}announce** » __Announce a message__.
          **${prefix}application** » __Application setup__.
          **${prefix}badword** » __Edit badwords list for chat filtering__.
          **${prefix}ban** » __Ban a member__.
          **${prefix}cc** » __Create a custom command__.
          **${prefix}close** » __Close a ticket__.
          **${prefix}clear** » __Delete messages__.
          **${prefix}close** » __Close a ticket__.
          **${prefix}embed** » __Send an embed message__.
          **${prefix}emojis** » __Get list of emojis bot has access to__.
          **${prefix}kick** » __Kick a member from the server__.
          **${prefix}members** » __List members present in the server__.
          **${prefix}msg** » __Private message a member as bot__.
          **${prefix}msge** » __Message an embed to a member as bot__.
          **${prefix}mute** » __Mute a member__.
          **${prefix}nuke** » __Clean the channel with a nuke__.
          **${prefix}remove** » __Remove a member from the ticket__.
          **${prefix}say** » __Say a message as the bot__.
          **${prefix}set** » __Set variables for the bot__.
          **${prefix}sping** » __make the bot spam ping a person__.
          **${prefix}swear** » __Edit swear list for chat filtering__.
          **${prefix}testjoin** » __To create a join and leave message for you__.
          **${prefix}unmute** » __Unmute a member__.
          **${prefix}warn** » __To warn a member__.
          **${prefix}warns** » __Check warns of a member__.
        `)
        .setColor("RANDOM");
        await message.author.send(embed).catch( error =>{
          //no need of telling again.
        });
    }
  }
}