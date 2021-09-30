const Canvas = require("canvas");
const path = require('path');
module.exports = {
  name : 'verify',
  description : 'for verification',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTimestamp();
    let verificationText;
    const verifiedRoleID = await database.get('verifiedRoleID');
    const verificationChannelID = await database.get('verificationChannelID');
    let extraVerifiedRoleIDsList = await database.get("extraVerifiedRoleID");
    extraVerifiedRoleIDsList = extraVerifiedRoleIDsList.split(" ");
    if((!verifiedRoleID) || (!verificationChannelID)){
      embed.setDescription('The verification system is not setup. Kindly ask the staff to setup is first.')
      message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 20000)).catch(error => {/*nothing*/});
      return;
    }
    const verifiedRole = message.guild.roles.cache.get(verifiedRoleID);
    const verificationChannel = message.guild.channels.cache.get(verificationChannelID);
    if((!verifiedRole) || (!verificationChannel)){
      embed.setDescription('The verification system is not setup. Kindly ask the server staff to setup it first.');
      message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 20000)).catch(error => {/*nothing*/});
      message.delete().catch(error => {/*nothing*/});
      return;
    }
    if(message.channel.id != verificationChannelID) return message.delete().catch(error => {/*nothing*/});
    for(let i=0; i<=extraVerifiedRoleIDsList.length-1; i++){
      await message.guild.members.cache.get(message.author.id).roles.add(extraVerifiedRoleIDsList[i]).catch(error => {});
    }
    if(message.member.roles.cache.has(verifiedRoleID)){
      verificationText = "Already Verified!";
    }
    else{
      try{
        await message.guild.members.cache.get(message.author.id).roles.add(verifiedRoleID).catch(error => {});
        verificationText = "Successfully Verified!";
      }catch{
        embed.setDescription("Sorry, I'm lower in rank than you.\nPlease put my role above yours so that i can work propely.");
        await message.channel.send(embed).then((msg) => setTimeout(function(){msg.delete().catch(error => {/*nothing*/});}, 20000)).catch(error => {/*nothing*/});
        await message.delete().catch(error => {/*nothing*/});
        return;
      }
    }
    let ix = 1000;
    let iy = 350;
    const canvas = Canvas.createCanvas(ix,iy);
    const ctx = canvas.getContext('2d');  
    let background;
    let vimg = await database.get("vimg");
    if(!vimg){
      let n = await database.get("image number");
      if(!n){
        n = 0;
        await database.set("image number", n);
      }
      if(n >= 15 || n < 0)
        n = 0;
      n = n+1;
      await database.set("image number", n);  
      background = await Canvas.loadImage(
        path.join(__dirname, `../backgrounds/background ${n}.jpeg`)
      );
    }
    else{
      background = await Canvas.loadImage(vimg);
    }
    let x = 0;
    let y = 0;
    ctx.drawImage(background, x, y);
    const pfp = await Canvas.loadImage(
      message.guild.iconURL({
        format: 'png'
      })
    );
    x = canvas.width / 2 - pfp.width / 2;
    y = 25;
    ctx.drawImage(pfp, x, y);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 40pt Arial';
    let text = verificationText;
    x = canvas.width / 2 - ctx.measureText(text).width / 2;
    ctx.fillText(text, x, 100 + pfp.height);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer());
    message.author.send('', attachment).catch(error => {/*nothing DMS are off or blocked*/});
    message.delete().catch(error => {/*nothing*/});
  }
}