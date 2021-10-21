const Discord = require("discord.js");
module.exports = {
  name : 'info',
  description : 'to get user info',

  async run(Discord, client, prefix, message, args, database, isAdmin, personFinder, messageEmojiFinder, react){
    let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTimestamp();
    let person = message.author;
    let member = message.member;
    if(args[0]){
      person = personFinder(message, args[0], "user");
      member = personFinder(message, args[0], "member");
      if(person === "not found"){
        person = message.author;
        member = message.member;
      }
    }
    let rolemap = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map(r => r)
      .join(",");
    if (rolemap.length > 1024) rolemap = "To many roles to display";
    if (!rolemap) rolemap = "No roles";
    embed.setAuthor(`User info for ${person.username}`, person.displayAvatarURL({dynamic: true}))
      .addFields(
        {
          name: "User Tag",
          value: person.tag
        },
        {
          name: "User ID",
          value: person.id 
        },
        {
          name: "Is Bot",
          value: person.bot
        },
        {
          name: "Nickname",
          value: member.nickname || person.username
        },
        {
          name: "Account Created",
          value: new Date(person.createdTimestamp).toLocaleDateString()
        },
        {
          name: "Joined Server",
          value: new Date(member.joinedTimestamp).toLocaleDateString()
        },
        {
          name: `Roles [${member.roles.cache.size}] `,
          value: rolemap
        }
      )
      .setColor(0xFFFF00)
      .setThumbnail(person.displayAvatarURL({dynamic: true}))
      .setTimestamp();
    message.channel.send(embed).catch(error => {/*nothing*/}); 
  }
}      