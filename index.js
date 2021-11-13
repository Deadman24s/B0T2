const Discord = require('discord.js')
                require('dotenv').config();
const client  = new Discord.Client();
client.commands = new Discord.Collection();

const util = require('minecraft-server-util');

const Canvas = require('canvas');

const Keyv = require('keyv');

const fs = require("fs");
const { readdirSync } = require('fs');

const { join } = require ('path');
const path = require('path');

const isAdmin = require('./checker/isAdmin.js');
const personFinder = require('./finder/personFinder.js');

const levelBarBuilder = require('./builders/levelBarBuilder.js');
const errorMessageBuilder = require ('./builders/errorMessageBuilder.js');
const dateBuilder = require('./builders/dateBuilder.js');
const databaseBuilder = require('./builders/databaseBuilder.js');
const react = require('./editors/react.js');
const chatBot = require('./events/chatBot.js');
let database;

const website = require('./website.js');
website();

let prefix = '-';
let checkPrefix ;

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for(const file of commandFiles){
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name,command);
}

client.on("error", console.error);

client.on('ready', () => {
  const onReady = require('./events/onReady.js');
  onReady(client, Keyv, util, prefix, errorMessageBuilder);
});

client.on('guildMemberAdd', async member => {
  database = databaseBuilder(Keyv, member.guild.id);
  const onGuildMemberAdd = require('./events/onGuildMemberAdd.js');
  onGuildMemberAdd(Discord, member, Canvas, path, database);
})

client.on("guildMemberRemove", async member => {
  database = databaseBuilder(Keyv, member.guild.id);
  const onGuildMemberRemove = require('./events/onGuildMemberRemove.js');
  onGuildMemberRemove(Discord, member, Canvas, path, database);
})

const application = require('./events/Application.js');
application(Discord, client, isAdmin, Keyv, fs, path, react);

const messageEmojiFinder = require('./editors/messageEmojiFinder.js');

const points = require('./events/points.js');
const customCommands = require('./events/customcommands.js');
const counting = require('./events/counting.js');
const chatFilter = require('./events/chatFilter.js');
const autoResponder = require('./events/autoResponder.js');
const ticketLogging = require('./events/ticketsLogging.js');
const commandsFinder = require('./events/commandsFinder.js');

//=================================================================================
client.on('message', async message => {
  let embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("YELLOW");
  if(message.guild){
    if(!isAdmin(message.guild.me)){
      embed.setDescription("I don't have the **__`ADMINISTRATOR`__** permission.\nPlease invite me again with my default role.")
        .setColor("RED");
      await message.channel.send(embed).catch(error => {/*nothing*/});
      await message.guild.leave().catch(error => {/*kek*/});
      return;
    }
    database = databaseBuilder(Keyv, message.guild.id);

    checkPrefix = await database.get("botPrefix");
    if(checkPrefix){
      prefix = checkPrefix;
    }

    let args = message.content.split(/ +/);
    //==========Counting Section===================================================
    counting(message, args, database, prefix, isAdmin, errorMessageBuilder);
    //==========Level/Points Section===============================================
    points(Discord, message, args, client, prefix, database, levelBarBuilder, isAdmin);
    //==========Keeping the verification Channel Clean From Bots' Messages=========
    const dbVerificationChannelID = await database.get("verificationChannelID");
    if(message.author.bot){
      if(message.channel.id == dbVerificationChannelID && message.author.id != client.user.id){
        await message.delete();
      }
      return;
    }
    //===============================================================================
    autoResponder(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, message.content.toLowerCase());
    //===========Tickets Logging====================================================
    if(message.content.startsWith(prefix)){
      let t = await message.content.slice(prefix.length);
      for(let i=1; i<=args.length; i++){
        t = await t.replace("\n", " \n ").replace(":\n", ": \n").replace("\n:", "\n :").replace(":\n:", ": \n :");
      }
      args = await t.split(/ +/);
      //==========Custom Commands====================================================
      customCommands(Discord, client, message, args, database, messageEmojiFinder);
      //==========Commands Finder====================================================
      commandsFinder(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, dbVerificationChannelID, react);
      //=============================================================================
    }
    else{
      if(message.channel.id == dbVerificationChannelID){
        await message.reply(`You are only allowed to use \`${prefix}verify\` command here.`).then((msg) => setTimeout(function(){msg.delete();}, 15000));
        await message.delete();
        return;
      }
      //===========Chat Filter=======================================================
      chatFilter(Discord, message, message.content.toLowerCase(), database, isAdmin);
      //===========Auto Responder=====================================================
      ticketLogging(message, database, fs, path, dateBuilder);
      //==============================================================================
      chatBot(Discord, client, message, args, database, messageEmojiFinder);
      //=============================================================================
    }
  }
});

client.login();