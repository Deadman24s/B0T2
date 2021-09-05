module.exports = (message, id) => {
  let person = message.mentions.members.first();
  if(!person)
    person = message.guild.members.cache.get(id);
  if(!person){
    return "not found";
  }
  return person;
}