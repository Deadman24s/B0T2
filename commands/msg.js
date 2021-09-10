module.exports = {
  name : 'msg',
  description : 'to dm someone',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      await message.react('❌').catch(err => {/*nothing*/});
      return;
    }
    if(!isAdmin(message.guild.me)){
      await message.reactions.removeAll();
      await message.react('❌').catch(err => {/*nothing*/});
      embed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    reciever = personFinder(message, args[0], "user");
    if(reciever === "not found"){
      embed.setDescription("Wrong user provided or user doesn't exists in this server.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }  
    if(reciever.id == client.user.id){
      embed.setDescription("How can i message myself! :unamused:")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    }
    const msg = messageEmojiFinder(client, message, args.slice(1));
    reciever.send(msg).catch( async error =>{
      embed.setDescription("Couldn't send message to this user.\nEither his DMs are disabled or I'm blocked from his DM.")
        .setColor("RED");
      await message.channel.send(embed);
      return;
    });
    embed.setDescription(`Successfully messaged ${reciever}`)
      .setColor("GREEN");
    await message.channel.send(embed);
    }
}