module.exports = async(Discord, member, Canvas, path, database, type) => {
  const textSizeEditor = require('../editors/textSizeEditor.js');
  const canvas = Canvas.createCanvas(700, 250);
  const context = canvas.getContext('2d');  
  let sendingChannelID, sendingChannel;
  let jl;
  let msg;
  let embed = new Discord.MessageEmbed()
    .setTimestamp();
  if(type == "Welcome"){
    sendingChannelID = await database.get("playerJoinLogsChannelID");
    jl = "Joined";
    msg = await database.get("playerJoinMessage"); 
    embed.setColor("GREEN");
  }else if(type == "Good Bye"){
    sendingChannelID = await database.get("playerLeaveLogsChannelID");
    jl = "Left";
    msg = await database.get("playerLeaveMessage"); 
    embed.setColor("RED");
  }else{
    return;
  }
  if(!msg){
    msg = `**${member.user.username} ${jl}**!\n||**[**${member.user.tag}**]** **[**${member.id}**]**||`;
  }
  msg = msg.replace("{user}", member).replace("{userid}", member.id).replace("{usertag}", member.user.tag).replace("{username}", member.user.username).replace("{guild}", member.guild).replace("{guildid}", member.guild.id);
  embed.setDescription(`${msg}`);
  if(sendingChannelID){
    sendingChannel = await member.guild.channels.cache.get(sendingChannelID);
  }else{
    return;
  }
  if(!sendingChannel){
    return;
  }
  let background;
  let wimg = await database.get("welcomeImage");
  if(wimg){
    try{
      background = await Canvas.loadImage(wimg);
    }catch{
      await database.set("welcomeImage", null);
      wimg = null;
    }
  }
  if(!wimg){
    var n = await database.get("image number");
    if(!n){
      n = 0;
      await database.set("image number", n);
    }
    if(n >= 15 || n < 0){
      n = 0;
    }
    n = n+1;
    await database.set("image number", n);
    background = await Canvas.loadImage(
      path.join(__dirname, `../backgrounds/background ${n}.jpeg`)
    );
  }
  else{
    background = await Canvas.loadImage(wimg);
  }
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#000000';
  context.strokeRect(0, 0, canvas.width, canvas.height);
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
    
  context.font = 'bold 40pt Arial';
  context.fillStyle = '#000000';
  context.fillText(type, canvas.width / 2.25, canvas.height / 3.5);

  context.font = textSizeEditor(canvas, `${member.displayName}`);
  context.fillStyle = '#000000';
  context.fillText(`${member.displayName}`, canvas.width / 2.5, canvas.height / 1.5);

  context.font = '35px Arial';
  context.fillStyle = '#000000';
  context.fillText(`[${member.guild.memberCount}]`, canvas.width / 1.75, canvas.height / 1.1);

  context.beginPath();
  context.arc(125, 125, 100, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();
  context.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  await sendingChannel.send(embed).then(sendingChannel.send(' ', attachment));
  return attachment;
}