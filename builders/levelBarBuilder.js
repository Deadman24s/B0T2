module.exports = (client, percentage) =>{
  var bar = [], mainBar;
  const whitebar = client.emojis.cache.get("821938099163758653");
  const greenwhiterbar = client.emojis.cache.get("821937902992228394");
  const greenwhitebar = client.emojis.cache.get("821937885775134761");
  const greenerwhitebar = client.emojis.cache.get("821937866690789437"); 
  const greenbar = client.emojis.cache.get("821937851788558350");
  const yellowwhiterbar = client.emojis.cache.get("821938170815053865");
  const yellowwhitebar = client.emojis.cache.get("821938117052334110");
  const yellowerwhitebar = client.emojis.cache.get("821938152415559691");
  const yellowbar = client.emojis.cache.get("821938134497230868");
  const orangewhiterbar = client.emojis.cache.get("821937972734722069");
  const orangewhitebar = client.emojis.cache.get("821937957245419582");
  const orangerwhitebar = client.emojis.cache.get("821937939369951282");
  const orangebar = client.emojis.cache.get("821937926555697162");
  const redwhiterbar = client.emojis.cache.get("821938078876303390");
  const redwhitebar = client.emojis.cache.get("821938060735938591");
  const rederwhitebar = client.emojis.cache.get("821938038229303326");
  const redbar =  client.emojis.cache.get("821938003424706611");
  
  bar[0] = bar[1] = bar[2] = bar[3] = bar[4] = whitebar; 
  
  if(percentage <= 5)
    bar[0] = redwhiterbar;
  else if(percentage <= 10)
    bar[0] = redwhitebar;
  else if(percentage <= 15)
    bar[0] = rederwhitebar;
  else if(percentage <= 20)
    bar[0] = redbar;
  else{
    bar[0] = orangebar;
    if(percentage <= 25)
      bar[1] = orangewhiterbar;
    else if(percentage <= 30)
      bar[1] = orangewhitebar;
    else if(percentage <= 35)
      bar[1] = orangerwhitebar;
    else if(percentage <= 40)
      bar[1] = orangebar;
    else{
      bar[0] = bar[1] = yellowbar;
      if(percentage <= 45)
        bar[2] = yellowwhiterbar;
      else if(percentage <= 50)
        bar[2] = yellowwhitebar;
      else if(percentage <= 55)
        bar[2] = yellowerwhitebar;
      else if(percentage <= 60)
        bar[2] = yellowbar;
      else{
        bar[0] = bar[1] = bar[2] = greenbar;
        if(percentage <= 65)
          bar[3] = greenwhiterbar;
        else if(percentage <= 70)
          bar[3] = greenwhitebar;
        else if(percentage <= 75)
          bar[3] = greenerwhitebar;
        else if(percentage <= 80)
          bar[3] = greenbar;
        else{
          bar[0] = bar[1] = bar[2] = bar[3] = greenbar;
          if(percentage <= 85)
            bar[4] = greenwhiterbar;
          else if(percentage <= 90)
            bar[4] = greenwhitebar;
          else if(percentage <= 95)
            bar[4] = greenerwhitebar;
          else if(percentage <= 100)
            bar[4] = greenbar;
        }  
      }    
    }      
  }
  mainBar = bar.join("");
  return mainBar;
}