/*
 * Script By Nazir
 * Forbidden to delete my wm
 * Github : Nazir99inf
 
 * Recode  : M, Rafel Pratama
 * Connect : wa.me//6287737937323
*/

import {
  makeWASocket,
  jidDecode,
  Browsers,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  downloadContentFromMessage,
} from '@neoxr/baileys';
import readline from 'readline';
import pino from 'pino';
import chalk from 'chalk';
import './settings.js';

const delay = ms => new Promise(r => setTimeout(r, ms));

const question = text => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(text, ans => {
    rl.close();
    resolve(ans.trim());
  }));
};

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function downloadMedia(message, sock) {
  try {
    let mediaKey = null;
    let type = null;
    let mimetype = '';
    let caption = '';

    if (message.imageMessage) {
      mediaKey = message.imageMessage;
      type = 'image';
      mimetype = mediaKey.mimetype;
      caption = mediaKey.caption || '';
    } else if (message.videoMessage) {
      mediaKey = message.videoMessage;
      type = 'video';
      mimetype = mediaKey.mimetype;
      caption = mediaKey.caption || '';
    } else if (message.audioMessage) {
      mediaKey = message.audioMessage;
      type = 'audio';
      mimetype = mediaKey.mimetype;
      caption = mediaKey.caption || '';
    } else if (message.documentMessage) {
      mediaKey = message.documentMessage;
      type = 'document';
      mimetype = mediaKey.mimetype;
      caption = mediaKey.caption || '';
    } else {
      return null;
    }

    const stream = await downloadContentFromMessage(mediaKey, type);
    const buffer = await streamToBuffer(stream);
    return { buffer, type, mimetype, caption };
  } catch (err) {
    console.error(chalk.red('Download media error:'), err);
    return null;
  }
}

function formatTelegramTime() {
  const now = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
  let formatted = now.toLocaleString('id-ID', options);
  formatted = formatted.replace('pukul', 'pukul');
  return formatted;
}

async function sendToTelegram(mediaBuffer, type, captionText, pushName, waNumber) {
  if (!global.settings.sendTelegram) return;
  const token = global.key.telegram.Token;
  const chatId = global.key.telegram.ChatId;
  
  const mediaType = type === 'image' ? 'IMAGE' : type === 'video' ? 'VIDEO' : 'AUDIO';
  const formattedDate = formatTelegramTime();
  const finalCaption = `\u22EF *${mediaType} \u00B7 F O R W A R D*\n\n` +
    `\u25B8 *Nama* : ${pushName}\n` +
    `\u25B8 *Nomor* : https://wa.me/${waNumber.replace(/[^0-9]/g, '')}\n` +
    `\u25B8 *Caption* : ${captionText || '-'}\n` +
    `\u25B8 *Waktu* : ${formattedDate}`;
  
  const formData = new FormData();
  formData.append('chat_id', chatId);
  formData.append('caption', finalCaption);
  
  let url = `https://api.telegram.org/bot${token}/`;
  if (type === 'image') {
    url += 'sendPhoto';
    formData.append('photo', new Blob([mediaBuffer]), 'photo.jpg');
  } else if (type === 'video') {
    url += 'sendVideo';
    formData.append('video', new Blob([mediaBuffer]), 'video.mp4');
  } else if (type === 'audio') {
    url += 'sendAudio';
    formData.append('audio', new Blob([mediaBuffer]), 'voice.ogg');
  } else {
    return;
  }
  
  try {
    const response = await fetch(url, { method: 'POST', body: formData });
    const json = await response.json();
    if (!json.ok) console.error(chalk.red('Telegram error:'), json.description);
  } catch (err) {
    console.error(chalk.red('Failed to send to Telegram:'), err);
  }
}

async function System() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(chalk.gray(`Using WA v${version.join('.')}, isLatest: ${isLatest}`));

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    auth: state,
    printQRInTerminal: false,
    markOnlineOnConnect: false,
    browser: Browsers.ubuntu('Chrome'),
    connectTimeoutMs: 60_000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 30_000,
    syncFullHistory: false,
  });

  sock.decodeJid = jid => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      const d = jidDecode(jid) || {};
      return (d.user && d.server && `${d.user}@${d.server}`) || jid;
    }
    return jid;
  };

  if (!sock.authState.creds.registered) {
    console.log(chalk.yellow.bold('\n( ! )') + chalk.white.bold(' Input Your Number For Example(62xxx)'));
    const phoneRaw = await question(chalk.red.bold('> '));
    const phone = phoneRaw.replace(/[^0-9]/g, '');
    if (!phone) {
      console.log(chalk.red.bold('Nomor kosong, keluar.'));
      process.exit(1);
    }
    await delay(3000);
    try {
      let code = await sock.requestPairingCode(phone, 'NAZIR999');
      code = code?.match(/.{1,4}/g)?.join('-') || code;
      console.log(chalk.cyan.bold('Pairing code: ') + chalk.yellow.bold(code));
    } catch (err) {
      console.error(chalk.red.bold('Gagal request pairing code:'), err?.message || err);
      console.log(chalk.yellow('Tip: pastikan nomor benar (cth 6285xxx) lalu coba lagi.'));
    }
  }

  sock.ev.on('connection.update', async update => {
    const { connection, lastDisconnect } = update;
    if (connection === 'connecting') {
      console.log(chalk.yellow.bold('Koneksi pending...'));
    } else if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
      console.log(
        chalk.red.bold(`Koneksi terputus (code: ${statusCode}).`) +
        (shouldReconnect
          ? chalk.yellow.bold(' Reconnecting...')
          : chalk.red.bold(' Logged out, hapus folder session lalu jalankan ulang.'))
      );
      if (shouldReconnect) setTimeout(() => System().catch(console.error), 3000);
    } else if (connection === 'open') {
      console.log(chalk.green.bold('Koneksi tersambung'));
      console.log(chalk.white.bold('- Name:'), chalk.cyan.bold(sock.user?.name || 'Nazir'));
      try { await sock.sendPresenceUpdate('unavailable'); } catch (_) {}
      try {
        await sock.newsletterFollow('120363391202311948@newsletter');
      } catch (_) {}
      try { await sock.sendPresenceUpdate('unavailable'); } catch (_) {}
    }
  });

  const resolveToPN = async jid => {
    if (!jid) return jid;
    if (!jid.endsWith('@lid')) return jid;
    try {
      const pn = await sock.signalRepository?.lidMapping?.getPNForLID?.(jid);
      return pn || jid;
    } catch {
      return jid;
    }
  };

  const stayOffline = async () => {
    try { await sock.sendPresenceUpdate('unavailable'); } catch (_) {}
  };

  const reactedIds = new Map();
  const REACTED_TTL_MS = 24 * 60 * 60 * 1000;
  setInterval(() => {
    const now = Date.now();
    for (const [id, t] of reactedIds) {
      if (now - t > REACTED_TTL_MS) reactedIds.delete(id);
    }
  }, 60 * 60 * 1000);
  
  sock.ev.on('messages.upsert', async ({ messages }) => {
    try {
      const m = messages?.[0];
      if (!m || !m.message) return;
      if (m.key.remoteJid !== 'status@broadcast') return;
      if (m.key.fromMe) return;
      
      const isRealStatus = !!(
        m.message.imageMessage ||
        m.message.videoMessage ||
        m.message.extendedTextMessage ||
        m.message.conversation ||
        m.message.audioMessage ||
        m.message.stickerMessage ||
        m.message.documentMessage
      );
      if (!isRealStatus) return;
      
      const rawParticipant = m.key.participantPn || m.key.participantAlt || m.key.participant || m.participant;
      const pushName = m.pushName || 'Unknown';
      const participantPN = await resolveToPN(rawParticipant);
      let waNumber = '';
      if (participantPN && participantPN.includes('@s.whatsapp.net')) {
        waNumber = participantPN.split('@')[0];
      } else if (rawParticipant && typeof rawParticipant === 'string') {
        const match = rawParticipant.match(/(\d+)/);
        if (match) waNumber = match[0];
      }
      
      if (global.settings.autoreact) {
        if (m.key.id && reactedIds.has(m.key.id)) return;
        const emoji = global.emoji[Math.floor(Math.random() * global.emoji.length)];
        const meId = sock.decodeJid(sock.user.id);
        const recipients = [...new Set([participantPN, meId].filter(Boolean))];
        await sock.readMessages([m.key]).catch(() => {});
        await stayOffline();
        await sock.sendMessage(
          'status@broadcast',
          { react: { text: emoji, key: m.key } },
          { statusJidList: recipients }
        );
        await stayOffline();
        if (m.key.id) reactedIds.set(m.key.id, Date.now());
        console.log(
          chalk.magenta.bold('[ REACTION STORY ]\n') +
          chalk.white.bold('Name        : ') + chalk.cyan.bold(pushName + '\n') +
          chalk.white.bold('Raw (LID/PN): ') + chalk.gray((rawParticipant || 'unknown') + '\n') +
          chalk.white.bold('Resolved PN : ') + chalk.yellow.bold((participantPN || 'unknown') + '\n') +
          chalk.white.bold('Emoji       : ') + chalk.yellow.bold(emoji + '\n')
        );
      }
      
      if (global.settings.sendTelegram) {
        const mediaData = await downloadMedia(m.message, sock);
        if (mediaData) {
          let captionText = mediaData.caption;
          await sendToTelegram(mediaData.buffer, mediaData.type, captionText, pushName, waNumber);
        }
      }
    } catch (err) {
      console.error(chalk.red.bold('[ERROR]'), err?.message || err);
    }
  });

  sock.ev.on('creds.update', saveCreds);
}

System().catch(err => {
  console.error(chalk.red.bold('[FATAL]'), err);
  setTimeout(() => System().catch(console.error), 5000);
});