module.exports = {
  name : 'eembed',
  description : 'to make extensive embeds',
  
  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM");
    let tembed = new Discord.MessageEmbed();
    let value, worked = false;
    async function checkLink(value, link){
      try{
        tembed.setThumbnail(link);
        let msg = await message.channel.send(tembed);
        await msg.delete();
      }catch{
        embed.setDescription("The image url is not loadable pls recheck it and try again.")
          .setColor("RED");
        await message.channel.send(embed).catch(error => {});
        await database.set(`eembed${value}`, null);
        await message.reactions.removeAll();
        react(message, '❌');
        return false;
      }
      return true;
    }
    if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
    if((!args[0]) || args[0].toLowerCase() == "help"){
      embed.setDescription(`
      **Extensive Embed Help**\n
      **Variables**
      \`(You can provide value as "null" if you want to clear only 1 variable)\`
      **01** ~~»~~ __\`${prefix}eembed set webhookname <name>\`__- *To set the name of the webhook*.
      **02** ~~»~~ __\`${prefix}eembed set webhookpfp <imageURL>\`__- *To set the avatar of webhook*.
      **03** ~~»~~ __\`${prefix}eembed set author <name>\`__- *To set the author of embed*.
      **04** ~~»~~ __\`${prefix}eembed set authorimage <imageURL>\`__- *To set the author image of embed*.
      **05** ~~»~~ __\`${prefix}eembed set title <msg>\`__- *To set the title of embed*.
      **06** ~~»~~ __\`${prefix}eembed set thumbnail <imageURL>\`__- *To set the thumbnail of embed*.
      **07** ~~»~~ __\`${prefix}eembed set description <msg>\`__- *To set the description of embed*.
      **08** ~~»~~ __\`${prefix}eembed set image <imageURL>\`__- *To set the image of embed*.
      **09** ~~»~~ __\`${prefix}eembed set color <color>\`__- *To set the color of embed*.
      **10** ~~»~~ __\`${prefix}eembed set timestamp <true/false>\`__- *To enable/disable the timestamp of embed*.
      **11** ~~»~~ __\`${prefix}eembed set footer <msg>\`__- *To set the footer of embed*.
      **12** ~~»~~ __\`${prefix}eembed set footerimage <imageURL>\`__- *To set the footer image of embed*.\n
      **Loading**
      **01** ~~»~~ __\`${prefix}eembed load\`__- *To load the embed in present channel*.
      **02** ~~»~~ __\`${prefix}eembed load <channel>\`__- *To load the embed in <channel>*.\n
      **Cleaning**
      **01** ~~»~~ __\`${prefix}eembed clean\`__- *To clean the embed variables*.
      [You can use this invisible character to make spaces UwU- \`ㅤ\`.]
      `)
        .setColor("YELLOW");
      await message.channel.send(embed).catch(error => {});
    }
    else if(args[0].toLowerCase() == "set"){
      if(!args[1]){
        embed.setDescription("What do you want to set bruh :no_mouth:.")
          .setColor("RED")
          .setFooter(`${prefix}eembed help`);
        await message.channel.send(embed).catch(error => {});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      if(!args[2]){
        embed.setDescription("Please provide a value for the variable bruh. :no_mouth:")
          .setColor("RED")
          .setFooter(`${prefix}eembed help`);
        await message.channel.send(embed).catch(error => {});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      args[1] = args[1].toLowerCase();
      if(args[1] == "webhookname"){
        value = args.slice(2).join(" ");
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        await database.set(`eembed${args[1]}`, value);
      }
      else if(args[1] == "webhookpfp"){
        value = args[2];
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        worked = checkLink(args[1], value);
        if(!worked){
          return;
        }
        await database.set(`eembed${args[1]}`, value);
        embed.setImage(value);
        value = "";
      }
      else if(args[1] == "author"){
        value = args.slice(2).join(" ");
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        await database.set(`eembed${args[1]}`, value);
      }
      else if(args[1] == "authorimage"){
        value = args[2];
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        worked = checkLink(args[1], value);
        if(!worked){
          return;
        }
        await database.set(`eembed${args[1]}`, value);
        embed.setImage(value);
        value = "";
      }
      else if(args[1] == "title"){
        value = args.slice(2).join(" ");
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        await database.set(`eembed${args[1]}`, value);
      }
      else if(args[1] == "thumbnail"){
        value = args.slice(2).join(" ");
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        worked = checkLink(args[1], value);
        if(!worked){
          return;
        }
        await database.set(`eembed${args[1]}`, value);
        embed.setImage(value);
        value = "";
      }
      else if(args[1] == "description"){
        value = args.slice(2).join(" ");
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        await database.set(`eembed${args[1]}`, value);
      }
      else if(args[1] == "image"){
        value = args.slice(2).join(" ");
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        worked = checkLink(args[1], value);
        if(!worked){
          return;
        }
        await database.set(`eembed${args[1]}`, value);
        embed.setImage(value);
        value = "";
      }
      else if(args[1] == "color"){
        value = args.slice(2).join(" ");
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        await database.set(`eembed${args[1]}`, value);
      }
      else if(args[1] == "timestamp"){
        args[2] = args[2].toLowerCase();
        if(args[2] == "true" || args[2] == "false"){
          value = args[2];
        }
        else{
          embed.setDescription("You can only set it as `true` or `false`.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {});
          await message.reactions.removeAll();
          react(message, '❌');
          return;
        }
        await database.set(`eembed${args[1]}`, value);
      }
      else if(args[1] == "footer"){
        value = args.slice(2).join(" ");
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        await database.set(`eembed${args[1]}`, value);
      }
      else if(args[1] == "footerimage"){
        value = args[2];
        if(args[2].toLowerCase() == "null"){
          value = null;
        }
        worked = checkLink(args[1], value);
        if(!worked){
          return;
        }
        await database.set(`eembed${args[1]}`, value);
        embed.setImage(value);
        value = "";
      }
      else{
        embed.setDescription("There is no subcommand with that name.")
          .setColor("RED")
          .setFooter(`${prefix}eembed help`);
        await message.channel.send(embed).catch(error => {});
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      await embed.setDescription(`Successfully set \`extensive embed ${args[1]}\` as \`${value}\``)
        .setColor("GREEN");
      await message.channel.send(embed).catch(error => {});
    }
    else if(args[0].toLowerCase() == "load"){
      let channel = message.channel;
      if(args[1]){
        channel = message.mentions.channels.first();
        if(!channel){
          channel = message.guild.channels.cache.get(args[1]);
          if(!channel){
            channel = message.channel;
          }
        }
      }
      let webhookname = await database.get(`eembedwebhookname`);
      let webhookpfp = await database.get(`eembedwebhookpfp`);
      let author = await database.get(`eembedauthor`);
      let authorimage = await database.get(`eembedauthorimage`);
      let title = await database.get(`eembedtitle`);
      let thumbnail = await database.get(`eembedthumbnail`);
      let description = await database.get(`eembeddescription`);
      let image = await database.get(`eembedimage`);
      let color = await database.get(`eembedcolor`);
      let timestamp = await database.get(`eembedtimestamp`);
      let footer = await database.get(`eembedfooter`);
      let footerimage = await database.get(`eembedfooterimage`);
      function replaceEmojis(text){
        text = text.replace("\n", " \n ").replace(":\n", ": \n").replace("\n:", "\n :").replace(":\n:", ": \n :");
        let tempArgs = text.split(" ");
        text = messageEmojiFinder(client, message, tempArgs);
        return text;
      }
      if(author || authorimage){
        if(author && authorimage){
          embed.setAuthor(author,authorimage);
        }else if(author){
          embed.setAuthor(author);
        }else if(authorimage){
          embed.setAuthor('',authorimage);
        }
      }
      if(title){
        title = replaceEmojis(title);
        embed.setTitle(title);
      }
      if(thumbnail){
        embed.setThumbnail(thumbnail);
      }
      if(description){
        description = replaceEmojis(description);
        embed.setDescription(description);
      }
      if(image){
        embed.setImage(image);
      }
      if(color){
        embed.setColor(color);
      }
      if(timestamp == "true"){
        embed.setTimestamp();
      }
      if(footer || footerimage){
        if(footer && footerimage){
          embed.setFooter(footer, footerimage);
        }else if(footer){
          embed.setFooter(footer);
        }else if(footerimage){
          embed.setFooter('', footerimage);
        }
      }
      if(webhookname || webhookpfp){
        let ws, w;
        ws = await channel.fetchWebhooks();
        w = ws.first();
        if(!w){
          await channel.createWebhook(message.author.username, {
            avatar: message.author.displayAvatarURL({dynamic: true}),
          });
        }
        if(!webhookname){
          webhookname = message.author.username;
        }
        if(!webhookpfp){
          webhookpfp = message.author.displayAvatarURL({dynamic: true});
        }
        try {
          const webhooks = await channel.fetchWebhooks();
          const webhook = webhooks.first();
          await webhook.send({
            username: webhookname,
            avatarURL: webhookpfp,
            embeds: [embed]
          });
        }catch (error) {
          embed.setDescription("The extensive embed is empty.")
            .setColor("RED")
            .setFooter(`${prefix}eembed help`);
          await message.channel.send(embed);
          return;
        }
      }else{
        await channel.send(embed).catch(async error => {
          embed.setDescription("The extensive embed is empty.")
            .setColor("RED")
            .setFooter(`${prefix}eembed help`);
          await message.channel.send(embed);
        });
      }
    }
    else if(args[0].toLowerCase() == "clean"){
      await database.set(`eembedauthor`, null);
      await database.set(`eembedauthorimage`, null);
      await database.set(`eembedtitle`, null);
      await database.set(`eembedthumbnail`, null);
      await database.set(`eembeddescription`, null);
      await database.set(`eembedimage`, null);
      await database.set(`eembedcolor`, null);
      await database.set(`eembedfooter`, null);
      await database.set(`eembedfooterimage`, null);
      await database.set(`webhookname`, null);
      await database.set(`webhookpfp`, null);
    }
    else{
      embed.setDescription("There is no subcommand with that name.")
        .setColor("RED")
        .setFooter(`${prefix}eembed help`);
      await message.reactions.removeAll();
      react(message, '❌');
      return;
    }
  }
}