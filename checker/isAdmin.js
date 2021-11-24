const config = require("../config.json");
const authorID = config.authorID;

module.exports = (member) =>{
  if(member.id == authorID){
    return true;
  }else{
    return member.hasPermission("ADMINISTRATOR");
  }
}