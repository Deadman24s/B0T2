const os = require('os'),
  cpuStat = require('cpu-stat'),
  fetch = require('node-fetch'),
  osu = require("os-utils"),
  checkDiskSpace = require('check-disk-space').default;
const usageBarBuilder = require('../builders/usageBarBuilder.js');
const levelBarBuilder = require('../builders/levelBarBuilder.js');
const uptimeBuilder = require('../builders/uptimeBuilder.js');

const Keyv = require('keyv');
const databaseBuilder = require("../builders/databaseBuilder.js");
  
module.exports = {
  name : 'bot',
  description : 'for work on the bot',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder){
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(client.user.username)
      .setTimestamp();
    if(!isAdmin(message.guild.me)){
      await message.reactions.removeAll();
      await message.react('❌').catch(err => {/*nothing*/});
      embed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      return;
    }
    database = databaseBuilder(Keyv, "11111111111");
    if(args[0] == "invite"){
      embed.setDescription("**B0T INVITE LINK**-\n __*https://discord.com/api/oauth2/authorize?client_id=883351440700080139&permissions=8&scope=bot*__")
        .setColor("RANDOM");
      message.channel.send(embed).catch(error => {/*nothing*/});
    }

    let divider = 1048576;
        
    let totalMemory = os.totalmem() / divider;
    let totalMemoryText = totalMemory.toFixed(2) + "MB";
    if(totalMemory >= 1024){
      totalMemoryText = (totalMemory / 1024).toFixed(2) + "GB";
    }
    
    let freeMemory = os.freemem() / divider;
    let freeMemoryText = freeMemory.toFixed(2) + "MB";
    if(freeMemory >= 1024){
      freeMemoryText = (freeMemory / 1024).toFixed(2) + "GB";
    }
    let freeMemoryPercentage = ((freeMemory * 100) / totalMemory).toFixed(2);
    let freeMemoryPercentageBar = levelBarBuilder(client, freeMemoryPercentage);
    
    let usedMemory = totalMemory - freeMemory;
    let usedMemoryText = usedMemory.toFixed(2) + "MB";
    if(usedMemory >= 1024){
      usedMemoryText = (usedMemory / 1024).toFixed(2) + "GB";
    }
    let usedMemoryPercentage = ((usedMemory * 100) / totalMemory).toFixed(2);
    let usedMemoryPercentageBar = usageBarBuilder(client, usedMemoryPercentage);
    
    let rssMemory = process.memoryUsage().rss / divider;
    let rssMemoryText = rssMemory.toFixed(2) + "MB";
    if(rssMemory >= 1024){
      rssMemoryText = (rssMemory / 1024).toFixed(2) + "GB";
    }
    let rssMemoryPercentage = ((rssMemory * 100) / totalMemory).toFixed(2);
    let rssMemoryPercentageBar = usageBarBuilder(client, rssMemoryPercentage);
    
    let totalHeapMemory = process.memoryUsage().heapTotal / divider;
    let totalHeapMemoryText = totalHeapMemory.toFixed(2) + "MB";
    if(totalHeapMemory >= 1024){
      totalHeapMemoryText = (totalHeapMemory / 1024).toFixed(2) + "GB";
    }
    let totalHeapMemoryPercentage = ((totalHeapMemory * 100) / totalMemory).toFixed(2);
    let totalHeapMemoryPercentageBar = usageBarBuilder(client, totalHeapMemoryPercentage);

    let garbageCollectorMemory = totalMemory - (freeMemory + totalHeapMemory);
    let garbageCollectorMemoryText = garbageCollectorMemory.toFixed(2) + "MB";
    if(garbageCollectorMemory >= 1024){
      garbageCollectorMemoryText = (garbageCollectorMemory / 1024).toFixed(2) + "GB";
    }
    let garbageCollectorMemoryPercentage = ((garbageCollectorMemory * 100) / totalMemory).toFixed(2);
    let garbageCollectorMemoryPercentageBar = usageBarBuilder(client, garbageCollectorMemoryPercentage);

    let usedHeapMemory = process.memoryUsage().heapUsed / divider;
    let usedHeapMemoryText = usedHeapMemory.toFixed(2) + "MB";
    if(usedHeapMemory >= 1024){
      usedHeapMemoryText = (usedHeapMemory / 1024).toFixed(2) + "GB";
    }
    let usedHeapMemoryPercentage = ((usedHeapMemory * 100) / totalHeapMemory).toFixed(2);
    let usedHeapMemoryPercentageBar = usageBarBuilder(client, usedHeapMemoryPercentage);

    let externalMemory = process.memoryUsage().external / divider;
    let externalMemoryText = externalMemory.toFixed(2) + "MB";
    if(externalMemory >= 1024){
      externalMemoryText = (externalMemory / 1024).toFixed(2) + "GB";
    }
    let externalMemoryPercentage = ((externalMemory * 100) / totalMemory).toFixed(2);
    let externalMemoryPercentageBar = usageBarBuilder(client, externalMemoryPercentage);

    let generalMemoryUsagePercentage = ((usedHeapMemory * 100) / totalMemory).toFixed(2);
    let generalMemoryUsagePercentageBar = usageBarBuilder(client, generalMemoryUsagePercentage);

    let upTime = uptimeBuilder(process.uptime());

    const nodeVersion = process.version;
    const osType = os.type();

    if(message.author.id == "564106279862140938"){
      if((!args[0]) || args[0] == "help"){
        embed.setTitle("Bot Commands Help")
          .setDescription(`
            **01** ~~»~~ __\`-bot help\`__- *To get this command help message*.
            **02** ~~»~~ __\`-bot system\`__- *To get the bot's system info*.
            **03** ~~»~~ __\`-bot mem\`__- *To get the bot's memory usage info*.
            **04** ~~»~~ __\`-bot cpu\`__- *To get the bot's CPU usage info*.
            **05** ~~»~~ __\`-bot storage <location>\`__- *To find the storage usage*.
            **06** ~~»~~ __\`-bot rename <name>\`__- *To rename the bot*.
            **07** ~~»~~ __\`-bot avatar <url>\`__- *To change the bot's avatar*.
            **08** ~~»~~ __\`-bot invite\`__- *To get the B0T's invite link*.
            **09** ~~»~~ __\`-bot guildAdd <guildID>\`__- *To add a guild into the bot's database*.
            **10** ~~»~~ __\`-bot guildRemove <guildID>\`__- *To remove a guild from the bot's database*.
            **11** ~~»~~ __\`-bot guildsList\`__- *To get the list of guild IDs in the database*.`);
        await message.channel.send(embed).catch(error => {/*nothing*/});    
      }
      else if(args[0] == "system" || args[0] == "mem"){
        if(args[0] == "system"){
          embed.setTitle("Bot System")
          .addFields(
            {
              name: "__OS__",
              value: "** **"
            },
            {
              name: "Type",
              value: `\`${osType}\``
            },
            {
              name: "Uptime",
              value: `\`${upTime}\``
            },
            {
              name: "__Node__",
              value: "** **"
            },
            {
              name: "Version",
              value: `\`${nodeVersion}\``
            },
            {
              name: "__Memory Usage__",
              value: `\`${usedHeapMemoryText}\`/\`${totalMemoryText}\`\n${generalMemoryUsagePercentageBar}\`[${generalMemoryUsagePercentage}%]\``
            }
          );
        }
        else{
          embed.setTitle("Bot Memory Usage")
          .addFields(
            {
              name: "RSS",
              value: `\`${rssMemoryText}\`/\`${totalMemoryText}\`\n${rssMemoryPercentageBar}\`[${rssMemoryPercentage}%]\``
            },
            {
              name: "Heap Size",
              value: `\`${totalHeapMemoryText}\`/\`${totalMemoryText}\`\n${totalHeapMemoryPercentageBar}\`[${totalHeapMemoryPercentage}%]\``
            },
            {
              name: "Heap Used",
              value: `\`${usedHeapMemoryText}\`/\`${totalHeapMemoryText}\`\n${usedHeapMemoryPercentageBar}\`[${usedHeapMemoryPercentage}%]\``
            },
            {
              name: "External",
              value: `\`${externalMemoryText}\`/\`${totalMemoryText}\`\n${externalMemoryPercentageBar}\`[${externalMemoryPercentage}%]\``
            },
            {
              name: "Garbage Collection",
              value: `\`${garbageCollectorMemoryText}\`/\`${totalMemoryText}\`\n${garbageCollectorMemoryPercentageBar}\`[${garbageCollectorMemoryPercentage}%]\``
            },
            {
              name: "Total Memory Used",
              value: `\`${usedMemoryText}\`/\`${totalMemoryText}\`\n${usedMemoryPercentageBar}\`[${usedMemoryPercentage}%]\``
            },
            {
              name: "Free Memory",
              value: `\`${freeMemoryText}\`/\`${totalMemoryText}\`\n${freeMemoryPercentageBar}\`[${freeMemoryPercentage}%]\``
            }
          );
        }
        await message.channel.send(embed).catch(error => {/*nothing*/});
      }
      else if(args[0] == "cpu"){
        cpuStat.usagePercent(async function (error, percent, seconds) {
          if (error) {
            return console.error(error)
          }
          const coresCount = os.cpus().length; 
          const cpuModel = os.cpus()[0].model;
          const cpuUsagePercentage = percent.toFixed(2);
          const cpuUsagePercentageBar = usageBarBuilder(client, percent);
          const averageCpuLoadPercentage = ((osu.loadavg()/coresCount)*100).toFixed(2);
          const averageCpuLoadPercentageBar = usageBarBuilder(client, averageCpuLoadPercentage);
          embed.setTitle("Bot CPU Stats")
            .addFields(
              {
                name: "Model",
                value: `\`${cpuModel}\``
              },
              {
                name: "Cores",
                value: `\`${coresCount}\``
              },
              {
                name: "Usage",
                value: `${cpuUsagePercentageBar}\`[${cpuUsagePercentage}%]\``
              },
              {
                name: "Average Load",
                value: `${averageCpuLoadPercentageBar}\`[${averageCpuLoadPercentage}%]\``
              }
            );  
          await message.channel.send(embed).catch(error => {/*nothing*/});
        });
      }
      else if(args[0] == 'disk' || args[0] == 'storage'){
        let location = '/';
        if(osType.toLowerCase().includes('windows')){
          location = 'C:/';
        }
        if(args[1]){
          location = args[1];
        }
        checkDiskSpace(location).then((diskSpace) => {
          console.log(diskSpace);
          const toMB = 1048576;
          
          const diskTotal = diskSpace.size / toMB;
          let diskTotalText = diskTotal.toFixed(2) + "MB";
          if(diskTotal >= 1024){
            diskTotalText = (diskTotal / 1024).toFixed(2) + "GB";
            if(diskTotal >= 1048576){
              diskTotalText = (diskTotal / 1048576).toFixed(2) + "TB";
            }
          }
          
          const diskFree = diskSpace.free / toMB;
          let diskFreeText = diskFree.toFixed(2) + "MB";
          if(diskFree >= 1024){
            diskFreeText = (diskFree / 1024).toFixed(2) + "GB";
            if(diskFree >= 1048576){
              diskFreeText = (diskFree / 1048576).toFixed(2) + "TB";
            }
          }
          const diskFreePercentage = ((diskFree * 100) / diskTotal).toFixed(2);
          const diskFreePercentageBar = levelBarBuilder(client, diskFreePercentage);

          const diskUsed = diskTotal - diskFree;
          if(diskUsed >= 1024){
            diskUsedText = (diskUsed / 1024).toFixed(2) + "GB";
            if(diskUsed >= 1048576){
              diskUsedText = (diskUsed / 1048576).toFixed(2) + "TB";
            }
          }
          const diskUsedPercentage = ((diskUsed * 100) / diskTotal).toFixed(2);
          const diskUsedPercentageBar = usageBarBuilder(client, diskUsedPercentage);
          
          embed.setTitle("Disk Usage")
            .addFields(
              {
                name: 'Location',
                value: `\`${location}\``
              },
              {
                name: 'Storage Used',
                value: `\`${diskUsedText}\`/\`${diskTotalText}\`\n${diskUsedPercentageBar}\`[${diskUsedPercentage}%]\``
              },
              {
                name: "Storage Free",
                value: `\`${diskFreeText}\`/\`${diskTotalText}\`\n${diskFreePercentageBar}\`[${diskFreePercentage}%]\``
              }
            );
          message.channel.send(embed).catch(error => {/*nothing*/});            
        });
      }
      else if(args[0] == 'rename'){
        let newname;
        newname=args.slice(1).join(" ");
        client.user.setUsername(`${newname}`);
        embed = new Discord.MessageEmbed()
          .setDescription(`Successfully renamed the bot to **${newname}**`);
        message.channel.send(embed).catch(error => {/*nothing*/});
      }
      else if(args[0] == 'avatar'){
        let avatarlink;
        avatarlink=args[1];
        client.user.setAvatar(`${avatarlink}`);
        embed = new Discord.MessageEmbed()
          .setDescription(`Successfully changed the bot's avatar to-\n`)
          .setImage(`${args[1]}`);
        await message.channel.send(embed).catch(error => {/*nothing*/});
        await message.delete().catch(error => {/*nothing*/});
      }
      else if(args[0] == "guildAdd"){
        let guildIDsList = await database.get("guildsIDs");
        let guildIDsArray;
        if(guildIDsList){
          guildIDsArray = guildIDsList.split(" ");
          for(let i=0; i<=guildIDsArray.length-1; i++){
            if(args[1] == guildIDsArray[i]){
              embed.setDescription("Guild ID already added in the database.")
                .setColor("RED");
              message.channel.send(embed).catch(error => {/*nothing*/});
              return;
            }
          }
          guildIDsArray[guildIDsArray.length] = args[1];
          guildIDsList = guildIDsArray.join(" ");
          await database.set("guildsIDs", guildIDsList);
          embed.setDescription(`Successfully added the guild ID \`${args[1]}\` into the database.`)
            .setColor("GREEN");
          message.channel.send(embed).catch(error => {/*nothing*/});
        }
        else{
          await database.set("guildsIDs", args[1]);
          embed.setDescription("Successfully added the guildID into the database.")
            .setColor("GREEN");
          message.channel.send(embed).catch(error => {/*nothing*/});
        }
      }
      else if(args[0] == "guildRemove"){
        let guildIDsList = await database.get("guildsIDs");
        let guildIDsArray;
        if(guildIDsList){
          guildIDsArray = guildIDsList.split(" ");
          for(let i=0; i<=guildIDsArray.length-1; i++){
            if(args[1] == guildIDsArray[i]){
              if(guildIDsArray.length > 1){
                for(let j=i; j<=guildIDsArray.length-2; i++){
                  guildIDsArray[j] = guildIDsArray[j+1];
                } 
              }
              let t = await guildIDsArray.pop();
              guildIDsList = guildIDsArray.join(" ");
              await database.set("guildsIDs", guildIDsList);
              embed.setDescription(`Successfully removed the guild ID \`${t}\` from the database.`)
                .setColor("GREEN");
              message.channel.send(embed).catch(error => {/*nothing*/});
              return;
            }
          }
          embed.setDescription(`Couldn't find that guild ID \`${args[1]}\` in the database.`)
            .setColor("RED");
          message.channel.send(embed).catch(error => {/*nothing*/});
        }
        else{
          embed.setDescription("The guild IDs list is empty.")
            .setColor("RED");
          message.channel.send(embed).catch(error => {/*nothing*/});
        }
      }
      else if(args[0] == "guildsList"){
        let guildIDsList = await database.get("guildsIDs");
        let guildIDsArray;
        let guildNamesList;
        let guildNamesArray = [];
        if(guildIDsList){
          guildIDsArray = guildIDsList.split(" ");
          for(let i=0; i<=guildIDsArray.length-1; i++){
            guildNamesArray[i] = client.guilds.cache.get(guildIDsArray[i]).name;
          }
          guildNamesList = guildNamesArray.join(",");
          guildIDsList = guildIDsArray.join(",");
          message.channel.send(guildIDsList).catch(error => {/*nothing*/});
          message.channel.send(guildNamesList).catch(error => {/*nothing*/});
        }
        else{
          embed.setDescription("The guild IDs list is empty.")
            .setColor("RED");
          message.channel.send(embed).catch(error => {/*nothing*/});
        }
      }
    }
    else{
      if((!args[0]) || args[0] == "help"){
        embed.setTitle("Bot Commands Help")
          .setDescription(`
            **01** ~~»~~ __\`-bot invite\`__- *To get the B0T's invite link*.`);
        await message.channel.send(embed).catch(error => {/*nothing*/});    
      }
    }
  }    
}