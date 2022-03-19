const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const Database = require('../models/inviter.js');
const messageUserChannel = require("../schemas/messageUserChannel");
const conf = require("../configs/config.json");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");


const voiceUserChannel = require("../schemas/voiceUserChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");
const db = require("quick.db");

const qdb = require("quick.db");
const kdb = new qdb.table("Kayıt");

require("moment-duration-format");

exports.execute = async (client, message, args) => {
  


  const category = async (parentsArray) => {
    const data = await voiceUserParent.find({ guildID: message.guild.id, userID: message.author.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    return moment.duration(voiceStat).format("H [saat], m [dakika]");
  };
      let arr = [];

      let index = arr.findIndex((x) => x.id == message.author.id) + 1;
  const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
  const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
  const voiceLength = Active2 ? Active2.length : 0;
  let voiceTop;
  let messageTop;
  Active1.length > 0 ? messageTop = Active1.splice(0, 5).map((x, index) => `\`${index + 1}\`. ${x.channelID}: \`${Number(x.channelData).toLocaleString()} mesaj.\``).join("\n") : messageTop = "Veri bulunmuyor."
  Active2.length > 0 ? voiceTop = Active2.splice(0, 10).map((x, index)=> `\`${index + 1}\`. ${x.channelID}: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}.\``).join("\n") : voiceTop = "Veri bulunmuyor."
  
  const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: message.author.id });
  const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: message.author.id });

  const messageDaily = messageData ? messageData.dailyStat : 0;
  const messageWeekly = messageData ? messageData.weeklyStat : 0;

  const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
  const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
  let yetkilipermleri = [
    
    "926808085840949269",
    "926808065074933772",
    "926806203852525589",
    "926809197910315018",
    "926806198777446410",
    "926806189914869824", 
    "926806193979158588",
    "924741319446913034",
    "926822022451970049",
    ""]
    
    let komutpermleri = [
      "926809529360977950", 
      "926811625032396820", 
      "926812900964827169", 
      "926811667076108298"
    , "926811647346102282"]
      let skillpermleri = [
        "926806184743292958", 
        "924684545763205140", 
        "926896606480039957",]

let wexfilter = yetkilipermleri.filter(a => message.member.roles.cache.has(a))

let wexfilter2 = komutpermleri.filter(a => message.member.roles.cache.has(a))
let wexfilter3 = skillpermleri.filter(a => message.member.roles.cache.has(a))

  const filteredParents = message.guild.channels.cache.filter((x) =>
    x.type === "category" &&
    !conf.publicParents.includes(x.id) &&
    !conf.registerParents.includes(x.id) &&
    !conf.solvingParents.includes(x.id) &&
    !conf.privateParents.includes(x.id) &&
    !conf.aloneParents.includes(x.id) &&
    !conf.funParents.includes(x.id)
  );
 
  let cpuan = qdb.fetch(`cpuan${message.author.id}`) || `0`;

  let taglı = qdb.get(`aldı.${message.author.id}.tag`) || `0`;
  let uyeDurum;
    if (cpuan.length < 5) uyeDurum = 'Çok güvenli!';
    if (cpuan.length > 10 && cpuan.length < 50) uyeDurum = 'Güvenli!';
    if (cpuan.length > 51 && cpuan.length < 99) uyeDurum = 'Dikkat Çekiyor.!';
    if (cpuan.length > 100 && cpuan.length < 139) uyeDurum = 'Şüpheli!';
    if (cpuan.length > 140 && cpuan.length < 149) uyeDurum = 'Tehlikeli!';
    if (cpuan.length > 150) uyeDurum = 'Çok Tehkileli!';
  let mkp = qdb.get(`marketpuan${message.author.id}`) || `0`;
  let erkek = qdb.get(`erkekKayit_${message.author.id}`) || `0`;
  let toplamkayit = qdb.get(`toplamKayit_${message.author.id}`);
  let kız = qdb.get(`bayanKayit_${message.author.id}`) || `0`;
  let muteAlma = qdb.fetch(`muteAlma.${message.author.id}`) || `0`;
  let muteAtma = qdb.fetch(`muteAtma.${message.author.id}`) || `0`;

  let jailAlma = qdb.fetch(`jailAlma.${message.author.id}`) || `0`;
  let jailAtma = qdb.fetch(`jailAtma.${message.author.id}`) || `0`;

  let inv =  qdb.fetch(`inv.${message.author.id}.total`) || 0;  
  let smuteAlma = qdb.fetch(`smuteAlma.${message.author.id}`) || `0`;
  let smuteAtma = qdb.fetch(`smuteAtma.${message.author.id}`) || `0`;


 
  const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: message.author.id });
  const total = inviterData ? inviterData.total : 0;
  const regular = inviterData ? inviterData.regular : 0;
  const bonus = inviterData ? inviterData.bonus : 0;
  const leave = inviterData ? inviterData.leave : 0;
  const fake = inviterData ? inviterData.fake : 0;
  const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: message.author.id });
  const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
  let yetkilistat = await db.get(`registeryrole_${message.guild.id}`);

const görev = message.member.roles.cache.has("924040643712532501") ?
`\`\`\`
Cezapuan: ${cpuan || "0"} Puan (${uyeDurum})
Taglı Üye: ${taglı}
Davet: Toplam: ${total} (Regular ${regular}) Haftalık: ${weekly}
Kayıt: (Toplam ${toplamkayit || "0"}) (Erkek,${erkek} - Kadın,${kız})
Kayıt Market Puanı: ${mkp} puan. (.kayıtmarket)\`\`\`` : "";


const görev2 = message.member.roles.cache.has("924040643712532501") ?
`**Verdiği Cezalar** ChatMute: **${muteAtma}** VoiceMute: **${smuteAtma}** Jail: **${jailAtma}**
**Aldıgı Cezalar** ChatMute: **${muteAlma}** VoiceMute: **${smuteAlma}** Jail: **${jailAlma}**
 ` : "";



    let embed = new MessageEmbed().setColor("RANDOM");

   

    embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
   
  embed.setFooter(client.config.SetFooter)
    embed.setDescription(`
    ${message.author.toString()} kullanıcısının sunucu içerisindeki aktiflik bilgileri aşağıda belirtilmiştir.  
    
    ─────────────────────
    Şuanki Yetkili Permi: ${wexfilter.length ? wexfilter.map(x => `<@&${x}>`): "Bulunamadı."}
    Şuanki Komut Perm(leri): ${wexfilter2.length ? wexfilter2.map(x => `<@&${x}>`): "Bulunamadı."}
    Şuanki Skill Perm(leri): ${wexfilter3.length ? wexfilter3.map(x => `<@&${x}>`): "Bulunamadı."}
    ─────────────────────`)
    embed.addField(`Kategori Bilgileri:`,

  `${client.emojis.cache.find(x => x.name === "wex_nokta")} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}.\`
  ${client.emojis.cache.find(x => x.name === "wex_nokta")} Public Kategori: \`${await category(conf.publicParents)}.\`
  ${client.emojis.cache.find(x => x.name === "wex_nokta")} Register Kategori: \`${await category(conf.registerParents)}.\`
  ${client.emojis.cache.find(x => x.name === "wex_nokta")} Private Kategori: \`${await category(conf.privateParents)}.\`
  ${client.emojis.cache.find(x => x.name === "wex_nokta")} Alone Kategori: \`${await category(conf.aloneParents)}.\`
  ${client.emojis.cache.find(x => x.name === "wex_nokta")} Diğer: \`${await category(filteredParents.map(x => x.id))}.\`
  ─────────────────────
  
  `)

  embed.addField(`${client.emojis.cache.find(x => x.name === "wex_nokta")} Ses Kanal Sıralaması: - (\`Toplam ${voiceLength} kanal\`) `,`
    ${voiceTop}
    ─────────────────────`)

    embed.addField(`${client.emojis.cache.find(x => x.name === "wex_nokta")} Mesaj Bilgileri: - (\`Toplam ${messageData ? messageData.topStat : 0} mesaj\`)`,`
    ${messageTop}
    ─────────────────────`)
    embed.addField("**Toplam Ses**", `
    \`\`\`js
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`\`\`
    `, true);
    embed.addField("**Haftalık Ses**", `
    \`\`\`js
${voiceWeekly}\`\`\`
    `, true);
    embed.addField("**Günlük Ses**", `
    \`\`\`js
${voiceDaily}\`\`\`
    `, true);
    embed.addField("**Toplam Mesaj**", `
    \`\`\`js
${messageData ? messageData.topStat : 0} mesaj\`\`\`
    `, true);    embed.addField("**Haftalık Mesaj**", `
    \`\`\`js
${messageWeekly} mesaj\`\`\`
    `, true);    embed.addField("**Günlük Mesaj**", `
    \`\`\`js
${messageDaily} mesaj\`\`\`
    `, true);
    embed.addField(`Diğer Bilgiler:`,
    `\`\`\`js
Cezapuan: ${cpuan || "0"} Puan (${uyeDurum})
Taglı Üye: ${taglı}
Davet: Toplam: ${total} (Regular ${regular}) Haftalık: ${weekly}
Kayıt: (Toplam ${toplamkayit || "0"}) (Erkek,${erkek} - Kadın,${kız})
Kayıt Market Puanı: ${mkp} puan. (.kayıtmarket)\`\`\``)
	  embed.addField(`Ceza-i İşlemler:`,
`\`\`\`js
Verdiği Ceza(lar) C-Mute: ${muteAtma} V-Mute: ${smuteAtma} Jail: ${jailAtma}
Aldıgı Ceza(lar) C-Mute: ${muteAlma} V-Mute: ${smuteAlma} Jail: ${jailAlma}\`\`\``)

    message.lineReply(embed);
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.stat\` komutunu kullandı. [\`${message.content}\`]`);

  }
    

  

exports.conf = {
  command: "ystat", // Asıl komutumuz
  description: "ID li ceza bildiyi gösterir", // Komut açıklamamız
  aliases: ["yetkilistat","ytstat"] // Komutumuzun yardımcıları
}
