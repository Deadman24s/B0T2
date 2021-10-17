module.exports = {
  name: "suggestion",
  description: "suggest something",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    const suggest = require('./suggest.js');
    suggest.run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react, 'suggestion');
  }
}