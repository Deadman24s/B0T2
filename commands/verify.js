const Canvas = require("canvas");
const path = require('path');
module.exports = {
  name : 'verify',
  description : 'for verification',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let verificationText;
    const verifiedRoleID = await database.get('verifiedRoleID');
    const verificationChannelID = await database.get('verificationChannelID');
    if((!verifiedRoleID) || (!verificationChannelID)){
      message.channel.send('The verification system is not setup. Kindly ask the lazy to setup is first.').then((msg) => setTimeout(function(){msg.delete();}, 20000));
      return;
    }
    const verifiedRole = message.guild.roles.cache.get(verifiedRoleID);
    const verificationChannel = message.guild.channels.cache.get(verificationChannelID);
    if((!verifiedRole) || (!verificationChannel)){
      message.channel.send('The verification system is not setup. Kindly ask the server staff to setup it first.').then((msg) => setTimeout(function(){msg.delete();}, 20000));
      message.delete();
      return;
    }
    if(message.channel.id != verificationChannelID) return message.delete();
    if(message.member.roles.cache.has(verifiedRoleID)){
      verificationText = "Already Verified!";
    }
    else{
      await message.guild.members.cache.get(message.author.id).roles.add(verifiedRoleID);
      verificationText = "Successfully Verified!";
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
        path.join(__dirname, `../backgrounds/background ${n-1}.jpeg`)
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
    message.author.send('', attachment);
    message.delete();
  }
}