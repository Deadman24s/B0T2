module.exports = {
  name : 'pfp',
  description : 'to get pfp of a user',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    const avatar = require('./avatar.js');
    avatar.run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react);
  }
}