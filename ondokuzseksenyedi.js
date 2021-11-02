'use strict';

const { Client, MessageEmbed, Discord, MessageAttachment } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
let tarih = new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul"});
const client = new Client({
  ignoreDirect: true,
  disableMentions: "everyone"
});
const ms = require("ms");
const parsems = require("parse-ms");
const fs = require("fs");
let locked = false;
//#0c0027

const banAtanlar = new Set();
let muteliler = new Set();
let cezalilar = new Set();

client.on("ready", async () => {
  client.user.setStatus("idle");
  console.log("Logged in as " + client.user.tag);
  let guild = client.guilds.cache.get(settings.sunucu);

  let cookie = 0;
  let sayi = guild.memberCount;
  let taglı = guild.members.cache.filter(u => u.user.username.includes(elevation.tag)).size;
  let online = guild.members.cache.filter(u => u.presence.status !== "offline").size;
});
//msg, rolID, veren, sunucu, tip, args, arr

client.on("message", async (msg) => {
  if (msg.channel.type === "dm") return;
  if (msg.guild.id !== settings.sunucu) return;
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().startsWith("!tag")) {
    msg.channel.send(elevation.tag);
  } else if (msg.content.toLowerCase().startsWith("!link")) {
    msg.channel.send(elevation.link);
  };
  let ela = new RegExp(`^<@!${client.user.id}>`);
  let prefix = msg.content.match(ela) ? msg.content.match(ela)[0]: settings.prefix.toLowerCase();
  if (!msg.content.toLowerCase().startsWith(prefix)) return;
  let args = msg.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  var author = msg.guild.member(msg.author);
  let uye = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]);
  switch (command) {
      

      
    case "say":
      if (!author.permissions.has("ADMINISTRATOR")) return;
     let tagliUyeSayisi = msg.guild.members.cache.filter(u => u.user.username.includes(elevation.tag)).size;
     let onlineSayisi = msg.guild.members.cache.filter(u => u.presence.status !== "offline").size;
     msg.channel.send(`**${snc.sncIsim}: ${space(msg.guild.memberCount)}         Online: ${space(onlineSayisi)}**\n\n            **${snc.tagrolIsim}: ${space(tagliUyeSayisi)}**`);
      break;
      
    case "sesli":
      if (!author.permissions.has("ADMINISTRATOR")) return;
      let sesli = 0;
      msg.guild.channels.cache.filter(c => c.type === "voice").map(k => {
        sesli += k.members.size
      });
      msg.channel.send(duzembed(`Sesli kanallarda toplam **${sesli}** üye bulunmaktadır.`)).then(m => m.delete({ timeout: 5000 }));
      break;
      
    case "sil":
      if (!author.permissions.has("ADMINISTRATOR")) return;
      let silinecek = Number(args.join(" "));
      if (isNaN(silinecek)) return msg.channel.send("**Bir sayı girmelisin.**").then(m => m.delete({ timeout: 3000 }));
      msg.channel.bulkDelete(silinecek);
      break;
      
    case "eval":
    if (!settings.botSahipleri.includes(msg.author.id)) return;
    let evalCekiyoruzNeBakiyorsun = args.join(" ");
    if (!evalCekiyoruzNeBakiyorsun.includes("qwe")) {
      try {
        var kod = eval(evalCekiyoruzNeBakiyorsun);
        if (evalCekiyoruzNeBakiyorsun.length < 1) return;
        if (typeof kod !== "string");
        kod = require("util").inspect(kod, {
          depth: 0
        });
        let evalEmbed = new MessageEmbed()
          .setColor("BLACK")
          .addField("Code",`\`\`\`js\n${evalCekiyoruzNeBakiyorsun.length > 1024 ? "Karakter aşımı!" : evalCekiyoruzNeBakiyorsun}\`\`\``)
        .addField("Result",`\`\`\`js\n${kod.length > 1024 ? "Karakter aşımı!" : kod}\n\`\`\``);
        msg.channel.send(evalEmbed);
      } catch (hata) {
        let evalEmbed = new MessageEmbed()
          .setColor("BLACK")
          .addField("Code",`\`\`\`js\n${evalCekiyoruzNeBakiyorsun.length > 1024 ? "Karakter aşımı!" : evalCekiyoruzNeBakiyorsun}\`\`\``)
          .addField("Err",`\`\`\`js\n${hata.length > 1024 ? "Karakter aşımı!" : hata}\`\`\``);
        msg.channel.send(evalEmbed);
      }
    } else {
      msg.reply("orospu çocu");
      return;
    };
      break;
      
    case "ever-at":
      if (!author.permissions.has("904825884140273694")) return;
      if (!args[0]) {
        let uyeler = msg.guild.members.cache.filter(u => {
          return (
          u.roles.cache.some(r => settings.ever.includes(r.id)) && !u.voice.channel && u.presence.status !== "offline"
          )
        }).map(u => u.user);
        msg.channel.send(`**sa : \n \n** ${uyeler.join(", \n")}`);
      } else if (["dm", "dm-at"].includes(args[0])) {
        msg.guild.members.cache.filter(u => {
          return (
            u.roles.cache.some(r => settings.ever.includes(r.id)) && !u.voice.channel && u.presence.status !== "offline"
          );
        }).forEach(uye => {
          var text = "x";
          uye.send(text).catch(err => {
            msg.channel.send(`${uye} adlı üyeye dmden mesaj atamıyorum. Müsait isen public odalara değil isen alone odalarına geçiş yapabilirsin.`);
          });
        });
      };
      break;
      
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
  };
  
});

//////////////////////////////////////////////

const settings = {
  "prefix": ".",
  "qwe": "OTA1MTg0OTg1OTExMjkxOTI2.YYGZNg.A2gt4r8bXx7BTc31fUREIit77Pw",
  "sunucu": "902633767166943252",
  "botSahipleri": ["904336345315569685", ""],
  "sahipler": ["904336345315569685", "218646470641975296", "578771131641626664" ,"787380115520487464", "767693967382806558"],
  "ever": "902633767166943252"
};

const elevation = {
  "tag": "1987",
  "link": "https://discord.gg/1987",

};

const snc = {
  "sncIsim": "1987 #Reaven",
  "tagrolIsim": "Bir Dokuz Sekiz Yedi",
  "blackList": ["", "", "", ""],
};
//////////////////////////////////////////////
function duzembed(msj) {
  return {
    embed: {
      description: msj,
      timestamp: new Date(),
      color: Math.floor(Math.random() * (0xFFFFFF + 1)),
      footer: {
        text: `${[xd[Math.floor(Math.random() * xd.length)]]}`
      }
    }
  };
};
//
function banembed(msj) {
  return {
    embed: {
      description: msj,
      timestamp: new Date(),
      color: Math.floor(Math.random() * (0xffffff + 1)),
      footer: {
        text: `Bugün saat:`
      }
    }
  };
};
//
function nrmlembed(msj) {
  return {
    embed: {
      description: msj,
      timestamp: new Date(),
      color: Math.floor(Math.random() * (0xffffff + 1))
    }
  };
};
//
function space(ela) {
  let res = "";
  String(ela).split("").forEach(n => {
    res += "" + elevation.ahaha[Number(n)];
  });
  return res;
};
//
async function beko(msg, rolID, veren, sunucu, tip, args, arr) {
  let author = msg.guild.member(msg.author);
  let uye = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args);
  if (tip === "normal") {
    if (!author.roles.cache.get(roles.botc) && !author.permissions.has("MANAGE_ROLES")) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
    if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
    if (uye.roles.cache.get(rolID)) {
      await uye.roles.remove(rolID).catch();
      await msg.channel.send(duzembed(`${uye} adlı üyeden <@&${rolID}> rolü alındı.`)).then(m => m.delete({ timeout: 5000 }));
    } else {
      await uye.roles.add(rolID).catch();
      await msg.channel.send(duzembed(`${uye} adlı üyeye <@&${rolID}> rolü verildi.`)).then(m => m.delete({ timeout: 5000 }));
    };
  } else if (tip === "custom") {
    if (!arr.includes(author.id)) return msg.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
    if (!uye) return msg.channel.send("**Bir üye etiketlemelisin.**").then(m => m.delete({ timeout: 5000 }));
    if (uye.roles.cache.get(rolID)) {
      await uye.roles.remove(rolID).catch();
      await msg.channel.send(duzembed(`${uye} adlı üyeden <@&${rolID}> rolü alındı.`)).then(m => m.delete({ timeout: 5000 }));
    } else {
      await uye.roles.add(rolID).catch();
      await msg.channel.send(duzembed(`${uye} adlı üyeye <@&${rolID}> rolü verildi.`)).then(m => m.delete({ timeout: 5000 }));
    };
  };
};
//////////////////////////////////////////////
client.on("guildMemberAdd", async uye => {
  if (snc.blackList.includes(uye.id)) return uye.ban({ reason: "Black List", days: 7 });
});
//////////////////////////////////////////////
client.on("guildMemberRemove", async (uye) => {
  if (uye.roles.cache.get(roles.cezali)) {
    cezalilar.add(uye.id);
  };
});
//////////////////////////////////////////////
client.on("messageDelete", async (msj) => {
  if (msj.author.bot || msj.channel.type === "dm") return;
  let messageLog = msj.guild.channels.cache.find(c => c.name === "message-log");
  if (msj.guild.id !== settings.sunucu) return;
  if (msj.attachments.first()) {
    messageLog.send({
      embed: {
        description:
          msj.channel +
          " kanalında " +
          msj.author +
          " tarafından bir fotoğraf silindi. \n Silinen Fotoğraf : ",
        footer: {
          text: "Silindiği Saat:"
        },
        timestamp: new Date(),
        author: {
          name: msj.author.tag,
          icon_url: msj.author.avatarURL
        },
        thumbnail: {
          url: msj.author.avatarURL
        },
        image: {
          url: msj.attachments.first().proxyURL
        },
        color: Math.floor(Math.random() * (0xffffff + 1))
      }
    });
  } else {
    messageLog.send({
      embed: {
        color: Math.floor(Math.random() * (0xffffff + 1)),
        footer: {
          text: "Silindiği Saat:"
        },
        timestamp: new Date(),
        author: {
          name: msj.author.tag,
          icon_url: msj.author.avatarURL
        },
        thumbnail: {
          url: msj.author.avatarURL
        },
        description:
          msj.channel.name +
          " kanalında <@" +
          msj.author +
          "> tarafından bir mesaj silindi. \n\n Silinen Mesaj : " +
          msj.content
      }
    });
  };
});
//
client.on("messageUpdate", async (old, nev) => {
  let messageLog = nev.guild.channels.cache.find(c => c.name === "message-log");
  if (nev.author.bot || nev.channel.type === "dm") return;
  if (nev.guild.id !== settings.sunucu) return;
  if (old.content.toLowerCase() === nev.content.toLowerCase()) return;
  messageLog.send({
    embed: {
      description:
        nev.channel.name +
        " kanalında <@" +
        nev.author +
        "> tarafından bir mesaj düzenlendi. \n\n Eski Mesaj : " +
        old.content +
        "\n\n Yeni Mesaj : " +
        nev.content,
      color: Math.floor(Math.random() * (0xffffff + 1)),
      author: {
        name: old.author.tag,
        icon_url: old.author.avatarURL
      },
      thumbnail: {
        url: old.author.avatarURL
      },
      timestamp: new Date()
    }
  });
});
//////////////////////////////////////////////
//
require("express")().listen(process.env.PORT);
//
client.login(settings.qwe);
//
process.on("uncaughtExpection", function (err) {
  if (err) console.error(err);
});

