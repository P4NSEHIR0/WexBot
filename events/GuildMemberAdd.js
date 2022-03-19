const { MessageEmbed } = require("discord.js");
const { Discord } = require("discord.js");

const client = global.client;
const qdb = require("quick.db");
const db = require("quick.db");

const moment = require("moment");

require("moment-duration-format");

exports.execute = async (member) => {
  

  let guvenli = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
  let jail = qdb.get(`jaill.${member.id}`)
  let fBan = qdb.get(`fBan.${member.id}`)
  reklam = qdb.get(`reklamcıoc.${member.id}`)

  if(fBan) {
    member.ban();
    client.channels.cache.get(client.config.guildMemberAdd.forceban).send(`${member} adlı üye banlı olduğu halde girmeye çalıştı ve tekrardan banlandı.`).catch(e => { })
  } else if(jail) {
    member.roles.add("926815141780148314").catch(e => { })
    client.channels.cache.find(a => a.name === "guild-member-add-log").send(`${member} adlı üye hesabı 7 gün önce açılmış olduğu için jaile atılmıştır.`).catch(e => { })

  } else if(guvenli) {
    member.roles.add("926895290768826390").catch(e => { })
    client.channels.cache.find(a => a.name === "guild-member-add-log").send(`${member} adlı üye hesabı 7 gün önce açılmış olduğu için jaile atılmıştır.`).catch(e => { })
  } else if(reklam) {
    member.roles.add("926895302185721886").catch(e => { })
    client.channels.cache.find(a => a.name === "guild-member-add-log").send(`${member} adlı üye hesabı 7 gün önce açılmış olduğu için jaile atılmıştır.`).catch(e => { })
  } else {
    member.setNickname("İsim | Yaş")
    member.roles.add("924287558840643614").catch(e => { })
  }


  let tag = "✰"; //tagınız
  let rol = "924333933326368770"; //tag rol id
  if(member.user.username.includes(tag)){
    member.roles.add(rol)
    client.channels.cache.get("926894191802470431").send(`${member} adlı kullanıcı isminde \`✰\` bulundurarak sunucumuza katıldı. Kullanıcı adı: \`${member.user.tag}\``)

  }


  
  
 
};
exports.conf = {
  event: "guildMemberAdd" // Eventin ne olduğunu belirliyoruz.
};