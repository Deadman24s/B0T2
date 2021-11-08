module.exports = {
    name : 'customcommand',
    description : 'create custom commands',
  
    async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
      const cc = require("./cc.js");
      cc.run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react, "customcommand");
    }
  }