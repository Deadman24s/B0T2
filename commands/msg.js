module.exports = {
  name : 'msg',
  description : 'to dm someone',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    if(!isAdmin(message.member)){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    reciever = personFinder(message, args[0], "user");
    if(!reciever){
      embed.setDescription("Wrong user provided or user doesn't exists in this server.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }  
    if(reciever.id == client.user.id){
      embed.setDescription("How can i message myself! :unamused:")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    let msg = messageEmojiFinder(client, message, args.slice(1));
    msg = msg + `\n-${message.guild}`;
    embed.setDescription(`Successfully messaged ${reciever}`)
      .setColor("GREEN");
    let e = await message.channel.send(embed).catch(error => {/*nothing*/});
    reciever.send(msg).catch( error =>{
      embed.setDescription("Couldn't send message to this user.\nEither his DMs are disabled or I'm blocked from his DM.")
        .setColor("RED");
      e.edit(embed).catch(error => {/*nothing*/});
      message.reactions.removeAll();
      react(message, '❌');
    });
  }
}