module.exports = {
  name: "t",
  description: "To create a ticket",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react) {
    const create = require('./create.js');
    create.run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react, "t");
  }
}