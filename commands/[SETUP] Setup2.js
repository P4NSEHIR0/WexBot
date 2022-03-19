const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
require("moment-duration-format");
const db = require("quick.db");

const moment = require("moment");
require("../wexab.js");
exports.execute = async (client, message, args) => {
  if(message.author.id !== "728161454288535604")
  if(message.author.id !== "852623454649450547")  return message.react(client.emojis.cache.find(x => x.name === "wex_carpi"));

    let embed2 = new MessageEmbed().setColor("RANDOM");

    let KaraListe = qdb.fetch(`karaL.${message.author.id}`)
    if(KaraListe) return message.channel.send(embed2.setDescription(`Bu komutu kullanmak için yeterli yetkin bulunmamakta.`));

  
    let vmuteytrol = await db.get(`vmuteyetkilirole_${message.guild.id}`) || []
    let muteytrol = await db.get(`muteyetkilirole_${message.guild.id}`) || []
    let jailytrol = await db.get(`jailyetkilirole_${message.guild.id}`) || []
    let banytrol = await db.get(`banyetkilirole_${message.guild.id}`) || []
    let unregisterrole = await db.get(`unregisterrole_${message.guild.id}`) || []
    let şüphelirol = await db.get(`şüphelirole_${message.guild.id}`) || []
    let registeryrol = await db.get(`registeryrole_${message.guild.id}`) || []
    let cezalırol = await db.get(`cezalırole_${message.guild.id}`) || []
    let botkomutrol = await db.get(`botkomutrole_${message.guild.id}`) || []
    let taglırol = await db.get(`teamrole_${message.guild.id}`) || []


    let erkekrole = await db.get(`erkekrole_${message.guild.id}`) || []

    const acik = "Aktif"
    const kapali = "Deaktif"
  
    let embed = new MessageEmbed().setColor("RANDOM");

    const komut = args.slice(1).join(' ');
    if(args[0] == "tag1") {
      db.set(`tag1_wex_${message.guild.id}`, komut)
      message.lineReply(embed.setDescription(`1. Tagınız ${komut} olarak tanımlandı.`))
    }  

    if(args[0] == "tag2") {
      db.set(`tag2_wex_${message.guild.id}`, komut)
      message.lineReply(embed.setDescription(`2. Tagınız ${komut} olarak tanımlandı.`))
    }  


    
    }


exports.conf = {
    command: "serversetup",
    aliases: [],
    description: "Belirtilen üyenin tüm bilgilerini gösterir."
}
