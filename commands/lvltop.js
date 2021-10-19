module.exports = {
  name : 'lvltop',
  description : 'to check level leaderboard',
  
  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    const leveltop = require('./leveltop.js');
    leveltop.run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react);  
  }
}