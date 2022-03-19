const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = require("quick.db");
require("moment-duration-format");
const moment = require("moment");
require("../wexab.js");
exports.execute = async (client, message, args) => {
  if(message.author.id !== "728161454288535604")
  if(message.author.id !== "852623454649450547")  return message.react(client.emojis.cache.find(x => x.name === "wex_carpi"));

  
      let embed = new MessageEmbed().setColor("RANDOM");
  
    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));
    let roller =message.mentions.roles.map(r => r.id)
    if (!roller) return message.channel.send('Lütfen yetkili rolünü etiketlermisin?')
  
    if(args[0] == "vmuteyetkili") {
      db.set(`vmuteyetkilirole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
   
   
    if(args[0] == "muteyetkili") {
      db.set(`muteyetkilirole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    
    if(args[0] == "jailyetkili") {
      db.set(`jailyetkilirole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    }  
      
    if(args[0] == "banyetkili") {
      db.set(`banyetkilirole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    if(args[0] == "wexyetkili") {
      db.set(`wexyetkilibann_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
   
    if(args[0] == "kayıtsız") {
      db.set(`unregisterrole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    if(args[0] == "şüpheli") {
      db.set(`şüphelirole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    if(args[0] == "cezalı") {
      db.set(`cezalırole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    if(args[0] == "taglırole") {
      db.set(`teamrole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    if(args[0] == "botkomut") {
      db.set(`botkomutrole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  


    if(args[0] == "kayıtyetkili") {
      db.set(`registeryrole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

  
    if(args[0] == "erkekrole") {
      db.set(`erkekrole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    if(args[0] == "kadınrole") {
      db.set(`kadınrole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    
    if(args[0] == "vip") {
      db.set(`viptrole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    if(args[0] == "streamer") {
      db.set(`streamertrole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    if(args[0] == "cekiliskatılımcısı") {
      db.set(`etkinlikkatılım_wex`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    if(args[0] == "etkinlikkatılımcısı") {
      db.set(`etkinlikkatılım_wex`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    if(args[0] == "+vip") {
      db.set(`+viptrole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    if(args[0] == "muted") {
      db.set(`muted_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    
    if(args[0] == "vmuted") {
      db.set(`vmuted_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    if(args[0] == "vkcezalı") {
      db.set(`vkcezalı_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    if(args[0] == "dccezalı") {
      db.set(`dccezalı_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    if(args[0] == "ownerbotcu") {
      db.set(`botcu_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    if(args[0] == "enaltyt") {
      db.set(`enaltytrole_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    
    if(args[0] == "baslangıcyt") {
      db.set(`baslangıcyt_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
        
    if(args[0] == "2yetki") {
      db.set(`2inciyt_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
        
    if(args[0] == "3yetki") {
      db.set(`3üncücyt_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    if(args[0] == "yetkialım") {
      db.set(`yetkialımperm_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    if(args[0] == "reklamcı") {
      db.set(`reklamcı_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  

    if(args[0] == "reklamyetkili") {
      db.set(`reklamcıyt_${message.guild.id}`, roller)
      message.react(client.emojis.cache.find(x => x.name === "wex_yesil"));    
    }  
    //




  }
exports.conf = {
    command: "rolesetup",
    aliases: [],
    description: "Belirtilen üyenin tüm bilgilerini gösterir."
}
