module.exports = (member) =>{
  if(member.id == "564106279862140938"){
    return true;
  }else{
    return member.hasPermission("ADMINISTRATOR");
  }
}