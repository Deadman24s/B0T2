const path = require('path');
const fs = require('fs');
const dateBuilder = require('../builders/dateBuilder.js');
let date = dateBuilder();
const ticketBuilder = require('../builders/ticketBuilder.js');
module.exports = {
  name: "create",
  description: "To create a ticket",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react, cmd) {
    if(!cmd){
      cmd = "create";
    }
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    const staffRoleID = await database.get("staffRoleID");
    const person = message.author.id;
    if(!staffRoleID){
      embed.setDescription("The ticket system is not set kindly ask the staff to set it.")
        .setColor("RED");
      await message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 10000)).catch(error => {/*nothing*/});
      await message.delete().catch(error => {/*nothing*/});
      return;
    }
    if(!args[0]){
      embed.setDescription(`Kindly provide a reason also.\nSyntax- \`-${cmd} <reason>\``)
        .setColor("RED");
      await message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 10000)).catch(error => {/*nothing*/});
      await message.delete().catch(error => {/*nothing*/});
      return;
    }
    let ticketReason = args.join(" ");
    ticketBuilder(Discord, message, fs, path, date, ticketReason, person, staffRoleID);
  }
}