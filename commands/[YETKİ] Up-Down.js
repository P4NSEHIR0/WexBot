const moment = require("moment");
const db = require("quick.db");
const config = require("../stark.json");
const { MessageEmbed } = require("discord.js");
const Database = require('../models/inviter.js');
const messageUserChannel = require("../schemas/messageUserChannel");
const conf = require("../configs/config.json");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");    
const { MessageButton } = require('discord-buttons');
const voiceUserChannel = require("../schemas/voiceUserChannel");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");

const qdb = require("quick.db");
const kdb = new qdb.table("Kayıt");

require("moment-duration-format");

exports.execute = async (client, message, args) => {
  
  let embed2 = new MessageEmbed().setColor("RANDOM");


  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!member) return message.channel.send(embed2.setDescription("Bir kullanıcı belirtmelisin!"));
  let arr = await  db.get(`registeryrole_${message.guild.id}`) || []
  if (message.member.permissions.has(8) || message.member.roles.cache.some(e => arr.some(x => x == e))) {
  
  const category = async (parentsArray) => {
    const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    return moment.duration(voiceStat).format("H [saat], m [dakika]");
  };
  
  const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
  const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
  const voiceLength = Active2 ? Active2.length : 0;
  let voiceTop;
  let messageTop;
  Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `${x.channelID}: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."
  Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `${x.channelID}: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Veri bulunmuyor."
  
  const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
  const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });

  const messageDaily = messageData ? messageData.dailyStat : 0;
  const messageWeekly = messageData ? messageData.weeklyStat : 0;

  const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
  const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");


  const filteredParents = message.guild.channels.cache.filter((x) =>
    x.type === "category" &&
    !conf.publicParents.includes(x.id) &&
    !conf.registerParents.includes(x.id) &&
    !conf.solvingParents.includes(x.id) &&
    !conf.privateParents.includes(x.id) &&
    !conf.aloneParents.includes(x.id) &&
    !conf.funParents.includes(x.id)
  );
 
  let cpuan = qdb.fetch(`cpuan${member.id}`) || `0`;

  let taglı = qdb.get(`aldı.${member.id}.tag`) || `0`;
  let uyeDurum;
    if (cpuan.length < 5) uyeDurum = 'Çok güvenli!';
    if (cpuan.length > 10 && cpuan.length < 50) uyeDurum = 'Güvenli!';
    if (cpuan.length > 51 && cpuan.length < 99) uyeDurum = 'Dikkat Çekiyor.!';
    if (cpuan.length > 100 && cpuan.length < 139) uyeDurum = 'Şüpheli!';
    if (cpuan.length > 140 && cpuan.length < 149) uyeDurum = 'Tehlikeli!';
    if (cpuan.length > 150) uyeDurum = 'Çok Tehkileli!';
  let mkp = qdb.get(`marketpuan${member.id}`) || `0`;
  let erkek = qdb.get(`erkekKayit_${member.id}`) || `0`;
  let toplamkayit = qdb.get(`toplamKayit_${member.id}`);
  let kız = qdb.get(`bayanKayit_${member.id}`) || `0`;
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

 
  const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.id });
  const total = inviterData ? inviterData.total : 0;
  const regular = inviterData ? inviterData.regular : 0;
  const bonus = inviterData ? inviterData.bonus : 0;
  const leave = inviterData ? inviterData.leave : 0;
  const fake = inviterData ? inviterData.fake : 0;
  const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.id });
  const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;

const görev = message.member.roles.cache.has("916343926456209418") ?
`\`\`\`
Cezapuan: ${cpuan || "0"} Puan (${uyeDurum})
Taglı Üye: ${taglı}
Davet: Toplam: ${total} (Regular ${regular}) Haftalık: ${weekly}
Kayıt: (Toplam ${toplamkayit || "0"}) (Erkek,${erkek} - Kadın,${kız})
Kayıt Market Puanı: ${mkp} puan. (.kayıtmarket)\`\`\`` : "";



var button_1 = new MessageButton()
.setID("1")
.setLabel("Yetki Yükselt")
.setStyle("green")
.setEmoji("⬆️")

var button_2 = new MessageButton()
.setID("2")
.setLabel("İptal")
.setStyle("gray")
.setEmoji("❌")

var button_3 = new MessageButton()
.setID("3")
.setLabel("Yetkileri Düşür")
.setStyle("red")
.setEmoji("⬇️")
let wexfilter = yetkilipermleri.filter(a => message.member.roles.cache.has(a))

let wexfilter2 = komutpermleri.filter(a => message.member.roles.cache.has(a))
let wexfilter3 = skillpermleri.filter(a => message.member.roles.cache.has(a))

let embedwex = new MessageEmbed().setFooter(client.config.SetFooter).setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
.setDescription(`
Kullanıcının Yetkisi: ${wexfilter.length ? wexfilter.map(x => `<@&${x}>`): "Bulunamadı."},${wexfilter2.length ? wexfilter2.map(x => `<@&${x}>`): "Bulunamadı."}, ${wexfilter3.length ? wexfilter3.map(x => `<@&${x}>`): "Bulunamadı."}
${client.emojis.cache.find(x => x.name === "wex_nokta")} Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}.\`
${client.emojis.cache.find(x => x.name === "wex_nokta")} Public Kategori: \`${await category(conf.publicParents)}.\`
${client.emojis.cache.find(x => x.name === "wex_nokta")} Register Kategori: \`${await category(conf.registerParents)}.\`
${client.emojis.cache.find(x => x.name === "wex_nokta")} Private Kategori: \`${await category(conf.privateParents)}.\`
${client.emojis.cache.find(x => x.name === "wex_nokta")} Alone Kategori: \`${await category(conf.aloneParents)}.\`
${client.emojis.cache.find(x => x.name === "wex_nokta")} Diğer: \`${await category(filteredParents.map(x => x.id))}.\`
─────────────────────
    `)
    embedwex.addField(`${client.emojis.cache.find(x => x.name === "wex_nokta")} Ses Kanal Sıralaması: - (\`Toplam ${voiceLength} kanal\`) `,`
    ${voiceTop}
    ─────────────────────`)

    embedwex.addField(`${client.emojis.cache.find(x => x.name === "wex_nokta")} Mesaj Bilgileri: - (\`Toplam ${messageData ? messageData.topStat : 0} mesaj\`)`,`
    ${messageTop}
    ─────────────────────`)
    embedwex.addField("**Toplam Ses**", `
    \`\`\`js
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`\`\`
    `, true);
    embedwex.addField("**Haftalık Ses**", `
    \`\`\`js
${voiceWeekly}\`\`\`
    `, true);
    embedwex.addField("**Günlük Ses**", `
    \`\`\`js
${voiceDaily}\`\`\`
    `, true);
    embedwex.addField("**Toplam Mesaj**", `
    \`\`\`js
${messageData ? messageData.topStat : 0} mesaj\`\`\`
    `, true);    embedwex.addField("**Haftalık Mesaj**", `
    \`\`\`js
${messageWeekly} mesaj\`\`\`
    `, true);    embedwex.addField("**Günlük Mesaj**", `
    \`\`\`js
${messageDaily} mesaj\`\`\`
    `, true);
    embedwex.addField(`Diğer Bilgiler:`,
    `\`\`\`
Cezapuan: ${cpuan || "0"} Puan (${uyeDurum})
Taglı Üye: ${taglı}
Davet: Toplam: ${total} (Regular ${regular}) Haftalık: ${weekly}
Kayıt: (Toplam ${toplamkayit || "0"}) (Erkek,${erkek} - Kadın,${kız})
Kayıt Market Puanı: ${mkp} puan. (.kayıtmarket)\`\`\``)


    let msg = await message.channel.send({ buttons : [ button_1, button_2, button_3], embed: embedwex})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter)

      collector.on("collect", async (button) => {



        if(button.id === "1") {
          msg.delete()
          await button.reply.defer()
          let yetkiNumber;
          let sahipOlunanRol = Number();
          for (yetkiNumber = 0; yetkiNumber < config.Yetkiler.length ; yetkiNumber++) {
            if(member.roles.cache.has(config.Yetkiler[yetkiNumber])) {
              sahipOlunanRol += yetkiNumber
            };
          }  
       if(!member.roles.cache.has(config.Yetkiler[config.Yetkiler.length-1])){
          await member.roles.add(config.Yetkiler[sahipOlunanRol+1]).catch(e => { })
          await member.roles.remove(config.Yetkiler[sahipOlunanRol]).catch(e => { })
          await message.channel.send(embed2.setDescription(`${member} Kullanısı <@&${config.Yetkiler[sahipOlunanRol+1]}> Yetkisine Başarılı bir Şekilde Yükseltildi.`)).catch(e => { })
          await client.channels.cache.get("926900275682361434").send(embed2.setDescription(`${member} adlı kullanıcı <@&${config.Yetkiler[sahipOlunanRol+1]}> yetkisine yükseltildi.`))

        } else { 
          message.channel.send(embed2.setDescription(`:x: Belirtilen Kullanıcı Zaten Max Role Sahip.`)).catch(e => { }) }
      }
          

        
        

        if(button.id === "2") {
          await button.reply.defer()
          message.channel.send(embed2.setDescription(`İşlem iptal edildi.`))
 
        
        }

        if(button.id === "3") {
          msg.delete()
          let yetkiNumber;
          let sahipOlunanRol = Number();
          for (yetkiNumber = 0; yetkiNumber < config.Yetkiler.length ; yetkiNumber++) {
            if(member.roles.cache.has(config.Yetkiler[yetkiNumber])) {
              sahipOlunanRol += yetkiNumber
            };
          }  
          if(!member.roles.cache.has(config.Yetkiler[0])){
          await member.roles.add(config.Yetkiler[sahipOlunanRol-1]).catch(e => { })
          await member.roles.remove(config.Yetkiler[sahipOlunanRol]).catch(e => { })
          await message.channel.send(embed2.setDescription(`${member} Kullanısı <@&${config.Yetkiler[sahipOlunanRol-1]}> Yetkisine Başarılı bir Şekilde Düşürüldü.`)).catch(e => { })
          await client.channels.cache.get("926900275682361434").send(embed2.setDescription(`${member} adlı kullanıcı <@&${config.Yetkiler[sahipOlunanRol-1]}> yetkisine düşürüldü.`))

        } else {
          message.channel.send(embed2.setDescription(`${member} adlı kullanıcısı zaten suanda başlangıç yetkisinde yetkisini almak için tepkiye tıkla.
          ${member} adlı kullanıcının Yetkisi: ${wexfilter.length ? wexfilter.map(x => `<@&${x}>`): "Bulunamadı."},${wexfilter2.length ? wexfilter2.map(x => `<@&${x}>`): "Bulunamadı."}`)).then(async msj => {
          await msj.react('✅');
         const kabul = (reaction, member) => {
          return ['✅'].includes(reaction.emoji.name) && member.id === message.author.id;
        };
      msj.awaitReactions(kabul, {max: 1, time: 50000, error: ['time']}).then(async c => {
        let cevap = c.first();
        if (cevap) {
          message.lineReply("Yetkilinin [Yetki-Rolleri] (\`Sirius Of Astana\` , \`Register Hammer\`) rolleri başarılı bir şekilde alındı.")
         await msj.delete().catch(e => { });
         member.roles.remove("926808085840949269")
         member.roles.remove("926809529360977950")
          await button.reply.defer()

        }
        })
    
      })
    }
  }
    

   

  
	

  })
    
}
}

exports.conf = {
  command: "ytyükselt", // Asıl komutumuz
  description: "", // Komut açıklamamız
  aliases: ["ytdüşür","staff"] // Komutumuzun yardımcıları
}
