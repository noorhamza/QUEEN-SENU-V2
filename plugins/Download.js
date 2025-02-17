const {cmd , commands} = require('../command')
const yts = require('yt-search');
const fg = require('api-dylux');
const axios = require('axios');
const { Buffer } = require('buffer');

const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID

// ---------------------- Song Download -----------------------
cmd({
    pattern: 'song',
    desc: 'download songs',
    react: "🎧",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

      const snm = [2025];
        
        // The quoted message template
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)], // Random selection
                    status: 1,
                    surface: 1,
                    message: `✨ 𝐐𝐮𝐞𝐞𝐧 𝐒𝐞𝐧𝐮 𝐛𝐨𝐭 𝐦𝐚𝐝𝐞 𝐛𝐲 𝐉𝐞𝐬𝐭𝐞𝐫💗`,
                    orderTitle: "",
                    sellerJid: '94788770020@s.whatsapp.net'
                }
            }
        };
      
        if (!q) return reply('*Please enter a query or a url !*');

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `*Qᴜᴇᴇɴ ꜱᴇɴᴜ ᴍᴅ ꜱᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅ*

*|__________________________*
*|-ℹ️ ᴛɪᴛʟᴇ :* ${data.title}
*|-🕘 ᴛɪᴍᴇ :* ${data.timestamp}
*|-📌 ᴀɢᴏ :* ${data.ago}
*|-📉 ᴠɪᴇᴡꜱ :* ${data.views}
*|-🔗 ʟɪɴᴋ :* ${data.url}
*|__________________________*

*🔢 ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ :*

*1 ᴀᴜᴅɪᴏ ꜰɪʟᴇ🎶*
*2 ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ📁*

*© Qᴜᴇᴇɴ ꜱᴇɴᴜ ᴍᴅ 🧚‍♂️*`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        let down = await fg.yta(url);
                        let downloadUrl = down.dl_url;
                        await conn.sendMessage(from, { audio: { url:downloadUrl }, caption: '*👨‍💻 QUEEN SENU MD BY JESTER👨‍💻*', mimetype: 'audio/mpeg'},{ quoted: qMessage });
                        break;
                    case '2':               
                        // Send Document File
                        let downdoc = await fg.yta(url);
                        let downloaddocUrl = downdoc.dl_url;
                        await conn.sendMessage(from, { document: { url:downloaddocUrl }, caption: '*👨‍💻 QUEEN SENU MD BY JESTER 👨‍💻*', mimetype: 'audio/mpeg', fileName:data.title + ".mp3"}, { quoted: qMessage });
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});

//==================== Video downloader =========================

cmd({
    pattern: 'video',
    desc: 'download videos',
    react: "🎬",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const snm = [2025];
        
        // The quoted message template
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)], // Random selection
                    status: 1,
                    surface: 1,
                    message: `✨ 𝗾𝘂𝗲𝗲𝗻 𝘀𝐞𝐧𝐮 𝗯𝘆 𝗺𝗿 𝐣𝐞𝐬𝐭𝐞𝐫💗`,
                    orderTitle: "",
                    sellerJid: '94788770020@s.whatsapp.net'
                }
            }
        };
        
        if (!q) return reply('*Please enter a query or a url !*');

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `*Qᴜᴇᴇɴ ꜱᴇɴᴜ ᴍᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ*
*|__________________________*
*|-ℹ️ ᴛɪᴛʟᴇ :* ${data.title}
*|-🕘 ᴛɪᴍᴇ :* ${data.timestamp}
*|-📌 ᴀɢᴏ :* ${data.ago}
*|-📉 ᴠɪᴇᴡꜱ :* ${data.views}
*|-🔗 ʟɪɴᴋ :* ${data.url}
*|__________________________*

*🔢 ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ :*

*1 ᴠɪᴅᴇᴏ ꜰɪʟᴇ🎬*
*2 ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ📁*

*🔢 Reply Below Number :*

*👨‍💻 QUEEN SENU MD MR JESTER 👨‍💻*`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        let downvid = await fg.ytv(url);
                        let downloadvUrl = downvid.dl_url;
                        await conn.sendMessage(from, { video : { url:downloadvUrl }, caption: '*👨‍💻 QUEEN SENU MD MR JESTER 👨‍💻*', mimetype: 'video/mp4'},{ quoted: qMessage });
                        break;
                    case '2':
                        let downviddoc = await fg.ytv(url);
                        let downloadvdocUrl = downviddoc.dl_url;
                        await conn.sendMessage(from, { document: { url:downloadvdocUrl }, caption: '*👨‍💻 QUEEN SENU BY MR JESTER 👨‍💻*', mimetype: 'video/mp4', fileName:data.title + ".mp4" }, { quoted: qMessage });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});


//===================== img downloader ========================

cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const snm = [2025];
        
        // The quoted message template
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)], // Random selection
                    status: 1,
                    surface: 1,
                    message: `✨ 𝐐𝐮𝐞𝐞𝐧 𝐬𝐞𝐧𝐮 𝐛𝐲 𝐦𝐫 𝐣𝐞𝐬𝐭𝐞𝐫 💗`,
                    orderTitle: "",
                    sellerJid: '94788770020@s.whatsapp.net'
                }
            }
        };
        
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
🌟 *Image ${i + 1} from your search!* 🌟
        *Enjoy these images! 📸*

*👨‍💻 QUEEN SENU BY MR JESTER👨‍💻*
`
}, { quoted: qMessage });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

//======================= fb downloader ===================================================================

const { fetchJson } = require('../lib/functions')
const config = require('../config')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();
//fb downloader
cmd({
    pattern: "fb",
    desc: "Download fb videos",
    category: "download",
    react: "#️⃣",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("Please provide a valid Facebook video URL!");
        const data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);
        let desc = ` *Qᴜᴇᴇɴ ꜱᴇɴᴜ ꜰʙ ᴅᴏᴡɴʟᴏᴀᴅ*

*🔢 ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀ :*

*1 ᴅᴏᴡɴʟᴏᴀᴅ ʜᴅ Qᴜᴀʟɪᴛʏ*
*2 ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴅ Qᴜᴀʟɪᴛʏ*

*© Qᴜᴇᴇɴ ꜱᴇɴᴜ ʙʏ ᴊᴇꜱᴛᴇʀ-ɪᴅ 👨‍💻*`;

        const vv = await conn.sendMessage(from, { image: { url:"https://i.ibb.co/DHzs33fY/828f15825089f9ca.jpg"}, caption: desc }, { quoted: mek });
        
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: "*👨‍💻 QUEEN SENU BY MR JESTER 👨‍💻*" }, { quoted: mek });
                        break;
                    case '2':               
                    await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: "" }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});

//=========================== apk downloader ==============================

cmd({
    pattern: "apk",
    react: '📦',
    desc: "Download apk.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {
    const snm = [2025];
        
        // The quoted message template
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)], // Random selection
                    status: 1,
                    surface: 1,
                    message: `✨ QUEEN SENU BY MR JESTER 💗`,
                    orderTitle: "",
                    sellerJid: '94788770020@s.whatsapp.net'
                }
            }
        };

await m.react("🔄")
      
const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
const response = await axios.get(apiUrl);
const data = response.data;

let step1 = data.datalist.list[0].size % 1000000
let step2 = `.` + step1
let step3 = data.datalist.list[0].size / 1000000
let correctsize = step3 - step2
    
let desc = `
*Qᴜᴇᴇɴ ꜱᴇɴᴜ ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅ*
*╭──📦 ᴀᴘᴋ ᴅᴇᴛᴀɪʟꜱ 📦──◦•◦►•*
*╎*
*╎* *🏷️ Nᴀᴍᴇ :* ${data.datalist.list[0].name}
*╎* *📦 Sɪᴢᴇ :* ${correctsize}MB
*╎* *🔖 Pᴀᴄᴋᴀɢᴇ :* ${data.datalist.list[0].package}
*╎* *📆 Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ :* ${data.datalist.list[0].updated}
*╎* *👤 Dᴇᴠᴇʟᴏᴘᴇʀꜱ :* ${data.datalist.list[0].developer.name}
*╎*
*╰───────────────◦•◦►•*\n\n\*© Qᴜᴇᴇɴ ꜱᴇɴᴜ ᴍᴅ ʙʏ ᴊᴇꜱᴛᴇʀ 👨‍💻*`

await conn.sendMessage(from,{image: {url: data.datalist.list[0].icon},caption: desc},{quoted: mek})
await conn.sendMessage(from,{document: {url: data.datalist.list[0].file.path_alt},fileName: data.datalist.list[0].name,mimetype: 'application/vnd.android.package-archive',caption: `*👨‍💻 ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Qᴜᴇᴇɴ ꜱᴇɴᴜ ᴍᴅ 👨‍💻*`},{ quoted: qMessage });
        
await m.react("✅")

}catch(e){
console.log(e)
reply(`${e}`)
}
})
