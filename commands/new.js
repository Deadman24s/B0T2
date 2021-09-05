module.exports = {
  name: "new",
  description: "To create a ticket",

  async run (Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder) {
    const create = require('./create.js');
    create.run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, "new");
  }
}