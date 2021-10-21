const Discord = require("discord.js");
module.exports = {
  name : 'userinfo',
  description : 'to get user info',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    const info = require("./info.js");
    info.run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react);
  }
}      