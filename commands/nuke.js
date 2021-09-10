module.exports = {
    name : 'nuke',
    description : 'to nuke a channel',
  
    async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTimestamp();
      if(!isAdmin(message.member)){
        await message.reactions.removeAll();
        await message.react('❌').catch(err => {/*nothing*/});
        return;
      }
      if(!isAdmin(message.guild.me)){
        await message.reactions.removeAll();
        await message.react('❌').catch(err => {/*nothing*/});
        embed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.")
          .setColor("RED");
        await message.channel.send(embed);
        return;
      }
      embed.setDescription("Nuking the Channel in `5` seconds!");
      await message.channel.send(embed).then(async (msg) => setTimeout(async function(){
          embed.setDescription("Nuking the Channel in `4` seconds!");
          await msg.edit(embed).then(async (msg) => setTimeout(async function(){
            embed.setDescription("Nuking the channel in `3` seconds!");
            await msg.edit(embed).then(async (msg) => setTimeout(async function(){
              embed.setDescription("Nuking the channel in `2` seconds!");
              await msg.edit(embed).then(async (msg) => setTimeout(async function(){
                embed.setDescription("Nuking the channel in `1` second!");
                await msg.edit(embed).then(async (msg) => setTimeout(async function(){
                  embed.setDescription("Nuke Launched!");
                  await msg.edit(embed).then(async (msg) => setTimeout(async function(){
                    embed.setDescription("**CHANNEL NUKED**")
                      .setImage("https://i.ibb.co/Bcskp4q/nuked.gif");
                    await msg.edit(embed).then(async (msg) => setTimeout(async function(){
                      await msg.channel.clone().then(async (msg) => setTimeout(async function(){
                        await message.channel.delete();
                      },1000));
                    },1000));
                  },1000));
                },1000));
              },1000));
            },1000));
          },1000));
      }, 1000));
    }
  }