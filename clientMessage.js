const Discord = require("discord.js");
const client = global.client;
require("../wexab.js");

exports.execute = async (message) => {
  
  let client = message.client;
  
  if (message.author.bot) return;
  if(!message.guild) return;
  if (message.content.startsWith(client.config.prefix)) {
  
  let args = message.content.split(" ");
  let command = args[0].substring(client.config.prefix.length);
  args = args.splice(1)
    
  if (client.commands.has(command)) {
  client.commands.get(command).execute(client, message, args);   
  }
  else if(client.aliases.has(command)) {
  client.aliases.get(command).execute(client, message, args);   
  } return;
 };


 if (blockedFromCommand.includes(message.author.id)) return
 let owners = sistem.Owner
 if (!owners.includes(message.author.id)) {
   let blockArr = client.commandBlock.get(message.author.id) || []
   let datax = {
     içerik: message.content,
     kanal: message.channel.name,
     kanalID: message.channel.id,
     komut: command.name
   }
   blockArr.push(datax)
   client.commandBlock.set(message.author.id, blockArr)
   if (blockArr.length == 10) {
     message.channel.send(`${message.author} kötüye kullanım tespit edildi, komut kullanımların kapatılmıştır!`)  
     blockedFromCommand.push(message.author.id)
     logger.log(`${message.author.tag} (${message.author.id}) kullanıcısı komut engeli aldı!`, "block", message.guild.channels.cache.get("920740979512860675"), message.author);
  }

 setTimeout(() => { if (client.commandBlock.has(message.author.id)) { client.commandBlock.delete(message.author.id) } }, ms("999m")) // komutla kaldırdığım için ellemeyin buraya
 }
     if(command.permissions && command.permissions.length) {
         if(command.permissions.includes("OWNER")) {
             if(!sistem.Owner.some(id => uye.id == id)) return message.channel.send("xx");
         } else {
             if(!sistem.Owner.some(id => uye.id == id) && !command.permissions.some(x => uye.roles.cache.has(x)) && !uye.permissions.has('ADMINISTRATOR')) 
             return;
         }
     };


};   

exports.conf = {
    event: "message" // Eventin ne olduğunu belirliyoruz.
};