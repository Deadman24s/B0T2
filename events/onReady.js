//response.host, response.port, response.version
module.exports = async (client, Keyv, util, prefix, errorMessageBuilder) =>{
  const guildsCount = client.guilds.cache.size;
  const usersCount = client.users.cache.size;
  const channelsCount = client.channels.cache.size;
  const ticketsCount = client.channels.cache.filter(ch => ch.name.startsWith("ticket")).size;

  let guildText = "server";
  let userText = "user";
  let channelText = "channel";
  let ticketText = "ticket";

  if(guildsCount > 1) guildText = guildText + 's';
  if(usersCount > 1) userText = userText + 's';
  if(channelsCount > 1) channelText = channelText + 's';
  if(ticketsCount > 1) ticketText = ticketText + 's';

  let index = 0;
  
  let val1 = Math.floor((Math.random() * 300));
  let val2 = Math.floor((Math.random() * 200));
  if(val1 < val2){
    val1 = val1 - val2;
    val2 = val1 + val2;
    val1 = val2 - val1;
  }

  const activitiesList = [
    `Over ${guildsCount} ${guildText}`,
    `Over ${usersCount} ${userText}`,
    `Over ${channelsCount} ${channelText}`,
    `Over ${ticketsCount} ${ticketText}`,
    `For ${prefix}help`,
    "Shreshth Tiwari",
    "Some Memes.",
    "The World's End.",
    "Doraemon In Youtube.",
    "Anime.",
    "You.",
    "A Movie.",
    `Maths.`,
    `${val1} + ${val2} = ${(val1+val2)}`,
    `${val1} - ${val2} = ${(val1-val2)}`,
    `${val1} * ${val2} = ${(val1*val2)}`,
    `${val1} ÷ ${val2} = ${(val1/val2).toFixed(2)}`,
    "With ShreshthTiwari"
  ];  
  
  console.log(`-------------------------------------\n${client.user.tag} is online!\n-------------------------------------`);
  
  setInterval(async () => {
    if(index>=12)
      await client.user.setActivity(activitiesList[index], {type: "PLAYING"})
        .catch(console.error);
    else
      await client.user.setActivity(activitiesList[index], {type: "WATCHING"})
        .catch(console.error);
    index++;
    if(index >= activitiesList.length) index = 0;
  }, 10000);
  
  //---------------------------MINECRAFT SERVER PLAYING STATUS UPDATER-------------------------------
  const guildsMap = client.guilds.cache
    .sort((guild1, guild2) => guild1.position - guild2.position)
    .map(guild => guild.id);  
  setInterval(async () => {
    for(let i=0; i<=guildsMap.length-1; i++){
      let guild = client.guilds.cache.get(guildsMap[i]);
      if(guild){
        let database = new Keyv('sqlite://./databases/database.sqlite', {
          table: `${guild.id}`
        });
        database.on('error', err => console.log('Connection Error', err));
  
        let playingStatusChannelID = await database.get('playingStatusChannelID');
        if(playingStatusChannelID){
          let playingStatusChannel = guild.channels.cache.get(playingStatusChannelID);
          let numericIP = await database.get("numericIP");
          let port = await database.get("port") * 1;
  
          if(!port) port = 25565;
  
          if(numericIP && port){
            util.status(numericIP, { port: port, enableSRV: true, timeout: 5000, protocolVersion: 47 })
              .then(async (response) => {
                if(response)
                  await playingStatusChannel.setName(`Playing » ${response.onlinePlayers}/${response.maxPlayers}`);
                else
                  await playingStatusChannel.setName(`OFFLINE`);  
              })
              .catch((error) => {
                /*console.log(errorMessageBuilder(`Error fethcing the info of ip- "${numericIP}" and port "${port}"`));
                console.log(`For the guild- ${guild.name}, ${guild.id}`);*/
              });
          }
        }
      }
    }
  }, 600000);
}