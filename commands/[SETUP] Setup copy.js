const { Discord, MessageEmbed, MessageAttachment, ClientUser } = require("discord.js");
const Canvas = require("canvas")



exports.execute = async (client, message, args) => {
  let homhomembed = new MessageEmbed().setColor("RANDOM");

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    let fontSize = 70;

    do {
        
        ctx.font = `${fontSize -= 10}px sans-serif`;
        
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
};
    const canvas = Canvas.createCanvas(388, 234);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://media.discordapp.net/attachments/904664323769651211/925114266166624256/unknown.png?width=355&height=630');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font ='20px bebas neue',
    ctx.fillStyle = '#cac8c8';
    ctx.fillText(`${member.id}`, canvas.width / 8, canvas.height / 1.25);

    ctx.font ='30px bebas neue',
    ctx.fillStyle = '#cac8c8';
    ctx.fillText(` Dolar`, canvas.width / 2, canvas.height / 1.60);

  let yazıqwe = `${member.user.username}`
  if(yazıqwe.length >= 17) {yazıqwe = `İsmin Çok Uzun`}
  ctx.font ='23px bebas neue',
    ctx.fillStyle = '#cac8c8';
    ctx.fillText(`${yazıqwe}`, canvas.width / 3, canvas.height / 2.35);

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
 ctx.save();
    roundedImage(ctx, 150, 10, 65, 65, 25);
    ctx.clip();
  ctx.drawImage(avatar, 150, 10, 65, 65);
  ctx.closePath();

    ctx.clip();

  function roundedImage(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

  const attachment = new MessageAttachment(canvas.toBuffer(), 'unknown.png');
   
  let embedwex = new MessageEmbed().setColor("RANDOM");
  embedwex.setImage(`${attachment}`)
  embedwex.setDescription(``)
message.channel.send(embedwex)

  message.channel.send(homhomembed)
}
    
    exports.conf = {
      command: "para",
      aliases: [],
      description: "Belirtilen üyenin tüm bilgilerini gösterir."
  }
  