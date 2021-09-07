module.exports = (message, id, type) => {
  let person;
  if(type == "member"){
    person = message.mentions.members.first();
    if(!person)
      person = message.guild.members.cache.get(id);
    if(!person){
      return "not found";
    }
  }
  else if(type == "user"){
    person = message.mentions.users.first();
    if(!person)
      person = message.guild.users.cache.get(id);
    if(!person){
      return "not found";
    }
  }
  else{
    return "not found";
  }
  return person;
}