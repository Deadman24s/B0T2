module.exports = {
    name : 'wb',
    description : 'webhook messages',
  
    async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
      const webhook = require("./webhook.js");
      webhook.run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react, "wb")
    }
  }