const { MessageEmbed, Role, Discord } = require("discord.js");
const qdb = require("quick.db");
const inviteMemberSchema = require("../schemas/inviteMember");
const { MessageButton } = require('discord-buttons');
const inviterSchema = require("../schemas/inviter");
const db = require("../schemas/inviter");

const moment = require("moment");
const kdb = new qdb.table("Kayıt");
require("../wexab.js");
const Database = require('../models/inviter.js');
let embed = new MessageEmbed().setFooter(client.config.SetFooter).setColor("RANDOM")

exports.execute = async (client, message, args) => {
  var button_1 = new MessageButton()
  .setID("1")
  .setLabel("Günlük ve Haftalık Veriler")
  .setStyle("green")
  .setEmoji("📊")

  var button_2 = new MessageButton()
  .setID("2")
  .setLabel("Tüm Davet Verileri")
  .setStyle("gray")
  .setEmoji("📊")

  var button_3 = new MessageButton()
  .setID("3")
  .setLabel("Davet Sıralamsı")
  .setStyle("blurple")
  .setEmoji("📊")

  var button_4 = new MessageButton()
  .setID("4")
  .setLabel("İptal")
  .setStyle("red")
  .setEmoji("📊")


  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
  const total = inviterData ? inviterData.total : 0;
  const regular = inviterData ? inviterData.regular : 0;
  const bonus = inviterData ? inviterData.bonus : 0;
  const leave = inviterData ? inviterData.leave : 0;
  const fake = inviterData ? inviterData.fake : 0;
  const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
  const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;




  let embedwex = new MessageEmbed().setFooter(`50 Saniye sonra butonlar kullanılmaz hale gelecektir.`).setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
  .setDescription(`
  Merhaba, İstatiktiklerinize erişmek için aşağıdaki bilgilendirmeyi okuyunuz.
  
  \`•\` Günlük ve Haftalık Davert İstatistikleri \`YEŞİL BUTON 🟢\` 
  \`•\` Tüm Davet İstatistikleri için \`GRİ BUTON ⚫\` 
  \`•\` Davet Sıralaması içi \`MAVİ BUTON 🔵\` 
  \`•\` İptal \`KIRMIZI BUTON 🔴\` 
      `)
  
      let msg = await message.channel.send({ buttons : [ button_1, button_2, button_3, button_4 ], embed: embedwex})
   
      var filter = (button) => button.clicker.user.id === message.author.id;
     
      let collector = await msg.createButtonCollector(filter, {time: 50000})
  
        collector.on("collect", async (button) => {
  
      let embed = new MessageEmbed().setFooter(client.config.SetFooter).setColor("RANDOM");
  
     
  
      if(button.id === "1") {
        await button.reply.defer()
        msg.delete()
        message.channel.send(embed.setDescription(`
        Merhaba Günlük ve Haftalık verileriniz aşağıda belirtilmiştir.
        
        Günlük Olarak Veritabanında bulunan kayıt. (**${daily}**)

        Haftalık Olarak Veritabanında bulunan kayıt. (**${weekly}**)
        `))
        
              
        
    
    }
      
    if(button.id === "2") {
      await button.reply.defer()
      msg.delete()

      message.channel.send(embed.setDescription(`  
      Merhaba Tüm istatistikleriniz aşağıda detaylı olarak belirtilmiştir.

      Toplam Davet Sayın: (**${total}**)
      Toplam Gerçek Davet Sayın: (**${regular}**)
      Toplam Bonus Davet Sayın: (**${bonus}**)
      Toplam Sunucudan ayrılmış olan davet sayın: (**${leave}**)
      Toplam Sahte(Yeni Hesap) davet sayın: (**${fake}**)
      `))
      
            
      
  
  }
  if(button.id === "3") {
    let data = await db.find({ guildID: message.guild.id }).sort({ total: -1 });
    if (!data.length)return message.channel.send(embed.setDescription("Herhangi bir invite verisi bulunamadı!"));
    let arr = [];
    data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
    let index = arr.findIndex((x) => x.id == message.author.id) + 1;
  
    const veri = await db.findOne({ guildID: message.guild.id, userID: message.author.id });
    let list = data
      .filter((x) => message.guild.members.cache.has(x.userID))
      .splice(0, 10)
      .map((x, index) => `${x.userID === message.author.id ? `**${index + 1}.** <@${x.userID}> - Toplam **${x.total}** davet \`(${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)\` <= Sen` : `**${index + 1}.** <@${x.userID}> - Toplam **${x.total}** davet \`(${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)\``}`)
      .join("\n");
  
    await button.reply.defer()
    msg.delete()
    message.channel.send(embed.setDescription(`${list}`))
  }
  if(button.id === "4") {
    msg.delete()
    await button.reply.defer()
    message.channel.send(embed.setDescription(`İptal`))
  }
  })
  client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(+Date.now()).format(`Do MMMM YYYY | HH:mm`)}\`] - \`${message.author.tag}\` adlı kullanıcı <#${message.channel.id}> kanalında \`.davetlerim\` komutunu kullandı. [\`${message.content}\`]`);

}
exports.conf = {
    command: "davetlerim", // Asıl komutumuz
    description: "Belirtilen kişiyi erkek olarak kayıt eder", // Komut açıklamamız
    aliases: ["wexcikdavett"] // Komutumuzun yardımcıları
  }
 