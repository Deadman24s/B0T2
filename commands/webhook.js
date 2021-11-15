module.exports = {
    name : 'webhook',
    description : 'webhook messages',
  
    async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react, helpText){
      messageEmojiFinder = require("../editors/messageEmojiFinder.js");
      if(!helpText){
        helpText = "webhook";
      }
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM");
      if((!isAdmin(message.member)) && (message.author.id != "564106279862140938")){
        await message.reactions.removeAll();
        react(message, '❌');
        return;
      }
      if((!args[0]) || args[0].toLowerCase() == "help"){
        embed.setTitle("Webhook Commands Help")
          .setDescription( `
            **01** ~~»~~ __\`${prefix}${helpText} name <name>\`__- *To set the name of the webhook*.
            **02** ~~»~~ __\`${prefix}${helpText} avatar <url>\`__- *To set the avatar of the webhook*.
            **03** ~~»~~ __\`${prefix}${helpText} say <text>\`__- *To send a text message via webhook*.
            **04** ~~»~~ __\`${prefix}${helpText} embed <text>\`__- *To send an embed message via webhook*.
          `)
          .setColor("YELLOW");
        await message.channel.send(embed).catch(error => {});
      }
      else{
        if(!args[1]){
          embed.setDescription("Invalid command usage.")
            .setColor("RED");
          await message.channel.send(embed).catch(error => {});
          await message.reactions.removeAll();
          react(message, '❌');
          return;
        }
        else{
          let text;
          if(args[0].toLowerCase() == "name"){
            let name = args.slice(1).join(" ");
            await database.set("whName", name);
            embed.setDescription(`Successfully set the webhook name as- ${name}`)
              .setColor("GREEN");
            await message.channel.send(embed).catch(error => {});
          }
          else if(args[0].toLowerCase() == "avatar"){
            let avatarURL = args[1];
            try{
              embed.setThumbnail(avatarURL);
              let msg = await message.channel.send(embed);
              await msg.delete();
            }catch{
              embed.setDescription("The image url is not loadable pls recheck it and try again.")
                .setColor("RED");
              await message.channel.send(embed).catch(error => {});
              await message.reactions.removeAll();
              react(message, '❌');
              return;
            }
            await database.set("whURL", avatarURL);
            embed.setDescription("Successfully set the webhook avatar as- ")
              .setImage(avatarURL)
              .setColor("GREEN");
            await message.channel.send(embed).catch(error => {});
          }
          else if(args[0].toLowerCase() == "say" || args[0].toLowerCase() == "embed"){
            let channel;
            channel = message.mentions.channels.first();
            if(!channel){
              channel = message.channel;
              msg = messageEmojiFinder(client, message, args.slice(1));
            }else{
              msg = messageEmojiFinder(client, message, args.slice(2));
            }
            if(!msg){
              embed.setDescription("Write something bruh.")
                .setColor("RED")
                .setTimestamp(); 
              await message.channel.send(embed).catch(error => {/*nothing*/});
              await message.reactions.removeAll();
              react(message, '❌');
              return;
            }
            if(msg.length >= 2000){
              msg.length = 1997;
              msg = msg + "...";
            }
            let webhookName = await database.get("whName");
            let webhookURL = await database.get("whURL");
            if(!webhookName){
              webhookName = message.author.username;
            }
            if(!webhookURL){
              webhookURL = message.author.displayAvatarURL();
            }
            let ws, w;
            ws = await channel.fetchWebhooks();
            w = ws.first();
            if(!w){
              await channel.createWebhook(message.author.username, {
                avatar: message.author.displayAvatarURL({dynamic: true}),
              });
            }
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.first();
            if(args[0].toLowerCase() == "say"){
              try {
                await webhook.send(msg, {
                  username: webhookName,
                  avatarURL: webhookURL,
                });
              }catch (error) {
                embed.setDescription("Please provide a message.")
                  .setColor("RED")
                  .setFooter(`${prefix}eembed help`);
                await message.channel.send(embed);
                return;
              }
            }
            else if(args[0].toLowerCase() == "embed"){
              embed.setDescription(msg)
                .setColor("RANDOM");
              try {
                await webhook.send({
                  username: webhookName,
                  avatarURL: webhookURL,
                  embeds: [embed]
                });
              }catch (error) {
                embed.setDescription("The embed is empty.")
                  .setColor("RED")
                  .setFooter(`${prefix}eembed help`);
                await message.channel.send(embed);
                return;
              }
            }
            await message.delete().catch(error => {/*nothing*/});
          }
        }
      }
    }
  }