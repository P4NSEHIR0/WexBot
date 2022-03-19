const Discord = require("discord.js");
const client = global.client;
const chalk = require("chalk");
const moment = require("moment");
require("../wexab.js");
exports.execute = async () => {
  

      setInterval(() => {
        const customStatus = ["Wex  ❤️ ✰ Astana", "Stark ❤️ ✰ Astana", "Stark 💙 Wex"]
        const reloadStatus = Math.floor(Math.random() * (customStatus.length));
        client.user.setActivity(`${customStatus[reloadStatus]}`, { type: "PLAYING"})
        let botVoiceChannel = client.channels.cache.get("922951467487346738");
        if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
        console.log(chalk `{greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {blueBright ${client.user.tag} }{red adlı botun SetActivity kısımları Check'lendi.}`)
      }, 10000);

      console.log(chalk `{greenBright [${moment().format('YYYY-MM-DD HH:mm:ss')}]} {red Sunucuİsmi Manager adlı ses kanalına bağlandı.}`)

  client.channels.cache.get(client.config.BotVoice).join().catch(e => { });
};

exports.conf = {
  event: "ready" // Eventin ne olduğunu belirliyoruz.
};
