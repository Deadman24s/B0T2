module.exports = async(member, database) => {
  const totalMembersChannelID = await database.get("totalMemberCountChannelID");
  const membersChannelID = await database.get("memberCountChannelID");
  const botsChannelID = await database.get("botCountChannelID");
  let totalMembersChannel, membersChannel, botsChannel;
  if(totalMembersChannelID){
    totalMembersChannel = await member.guild.channels.cache.get(totalMembersChannelID);
    if(totalMembersChannel){
      await totalMembersChannel.setName(`All Members: ${member.guild.memberCount}`);
    }
  }
  if(membersChannelID){
    membersChannel = await member.guild.channels.cache.get(membersChannelID);
    if(membersChannel){
      await membersChannel.setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    }
  }
  if(botsChannelID){
    botsChannel = await member.guild.channels.cache.get(botsChannelID);
    if(botsChannel){
      await botsChannel.setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
    }
  }
}