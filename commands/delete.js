module.exports = {
    name : 'delete',
    description : 'to delete a channel',
  
    async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
      let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTimestamp();
      if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      embed.setDescription("Deleting the Channel in `5` seconds!");
      await message.channel.send(embed).then(async (msg) => setTimeout(async function(){
          embed.setDescription("Deleting the Channel in `4` seconds!");
          await msg.edit(embed).then(async (msg) => setTimeout(async function(){
            embed.setDescription("Deleting the channel in `3` seconds!");
            await msg.edit(embed).then(async (msg) => setTimeout(async function(){
              embed.setDescription("Deleting the channel in `2` seconds!");
              await msg.edit(embed).then(async (msg) => setTimeout(async function(){
                embed.setDescription("Deleting the channel in `1` second!");
                await msg.edit(embed).then(async (msg) => setTimeout(async function(){
                  embed.setDescription("Deleting the channel!");
                  await msg.edit(embed).then(async (msg) => setTimeout(async function(){
                    embed.setDescription("**CHANNEL DELETED**")
                      .setImage("https://i.ibb.co/R49Kjf3/wasted.jpg");
                    await msg.edit(embed).then(async (msg) => setTimeout(async function(){
                      await msg.channel.delete().catch(error => {/*nothing*/});
                    },1000)).catch(error => {/*nothing*/});
                  },1000)).catch(error => {/*nothing*/});
                },1000)).catch(error => {/*nothing*/});
              },1000)).catch(error => {/*nothing*/});
            },1000)).catch(error => {/*nothing*/});
          },1000)).catch(error => {/*nothing*/});
      }, 1000)).catch(error => {/*nothing*/});
    }
  }