🚀 ReactStory-Whatsapp

Automated WhatsApp bot designed to react intelligently to Status/Story updates using the "@neoxr/baileys" library. Built with modular architecture, performance in mind, and optional Telegram integration for media forwarding.

---

✨ Overview

ReactStory-Whatsapp adalah bot ringan namun powerful yang secara otomatis memberikan reaksi emoji ke status WhatsApp. Selain itu, bot ini juga mampu meneruskan media (gambar/video) ke Telegram sebagai fitur tambahan.

Dirancang untuk:

- ⚡ Performa stabil di Termux / VPS
- 🧩 Konfigurasi minimal & fleksibel
- 🔒 Operasi yang tidak mencolok (low profile behavior)

---

🔑 Key Features

🤖 Auto React Engine

Memberikan reaksi emoji secara otomatis pada setiap status yang terdeteksi.

🎯 Custom Emoji System

Emoji dapat disesuaikan sepenuhnya melalui konfigurasi.

🕵️ Stealth Mode

Mengurangi indikasi aktivitas bot (tidak mengganggu "Last Seen" secara mencolok).

📡 Telegram Forwarder (Optional)

Forward media status ke Telegram (channel / private chat).

⚙️ Minimal Configuration

Struktur konfigurasi sederhana, cocok untuk pemula maupun advanced user.

---

🛠️ Installation (Termux)

Ikuti langkah berikut secara berurutan:

1. Update System & Install Dependencies

pkg update && pkg upgrade -y
pkg install nodejs git -y

2. Clone Repository

git clone https://github.com/Nex-Core/ReactStory-Whatsapp.git
cd ReactStory-Whatsapp

3. Install Dependencies

npm install

4. Configuration

nano settings.js

5. Run Bot

npm start

Setelah itu, scan QR Code melalui WhatsApp (Linked Devices).

---

⚙️ Configuration Guide

File utama: "settings.js"

global.settings = {
  autoreact: true,       // Enable auto reaction
  sendTelegram: false,   // Enable Telegram forwarding
};

global.key = {
  telegram: {
    token: "YOUR_TELEGRAM_BOT_TOKEN",
    chatId: "-YOUR_CHAT_ID",
  }
};

global.emoji = ['🔥', '😍', '😂', '💀', '😎'];

---

📂 Project Structure

ReactStory-Whatsapp/
├── settings.js
├── index.js
├── lib/
├── src/
├── package.json
└── README.md

---

⚠️ Best Practices

- Jangan share file "settings.js" (berisi token)
- Gunakan bot Telegram pribadi (jangan publik)
- Monitor penggunaan untuk menghindari spam behavior
- Jalankan di environment stabil (Termux/VPS)

---

📜 License

This project is licensed under the ISC License.

---

🙏 Acknowledgements

Dengan penuh rasa hormat dan terima kasih kepada:

- Allah SWT
  Atas rahmat, kekuatan, dan kemudahan dalam setiap proses pengembangan.

- Orang Tua
  Sebagai fondasi utama dalam perjalanan hidup dan inspirasi tanpa batas.

- Nex-Core Team & Developer Community
  Atas kontribusi ilmu, diskusi, dan dukungan teknis.

- Nazir
  Sebagai original author dari base script.

---

🧠 Maintainer

Recode & Maintained by:
M. Rafel Pratama

---

📌 Final Notes

Project ini dibuat dengan pendekatan:

- Clean code
- Maintainability
- Real-world usability

Jika ingin kontribusi, silakan fork & pull request.

---
