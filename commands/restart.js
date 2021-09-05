module.exports = {
  name : 'restart',
  description : 'to restart the bot.',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    if(message.author.id == "564106279862140938"){
      process.exit();
    }
  }
}            