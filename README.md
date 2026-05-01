ReactStory-Whatsapp

Bot WhatsApp otomatis untuk memberikan reaksi (auto-react) pada status/story teman menggunakan library "@neoxr/baileys". Dilengkapi dengan fitur opsional untuk meneruskan media status ke Telegram.

```✨ Fitur Utama```

- Auto React Story: Memberikan reaksi emoji secara otomatis pada setiap status WhatsApp yang muncul.
- Custom Emoji: Daftar emoji yang digunakan untuk reaksi bisa diatur sesuai hati di "settings.js".
- History Offline Mode: Dirancang untuk memberikan reaksi tanpa mengubah status "Last Seen" kamu secara mencolok.
- Telegram Forwarder: Opsional untuk mengirim media (gambar/video) dari status WhatsApp ke channel atau chat Telegram secara otomatis.
- Simple Configuration: Pengaturan mudah dan minimalis, sangat cocok untuk penggunaan di Termux.

⚙️ Instalasi di Termux

Salin dan tempel perintah ini satu per satu:

1. Update & Install Dependencies

pkg update && pkg upgrade
pkg install nodejs git

2. Clone Repository

git clone https://github.com/Nex-Core/ReactStory-Whatsapp.git
cd ReactStory-Whatsapp

3. Install Library

npm install

4. Konfigurasi

nano settings.js

5. Jalankan Bot

npm start

Silakan scan kode QR yang muncul melalui WhatsApp (Linked Devices).

⚙️ Contoh Konfigurasi (settings.js)

global.settings = {
  autoreact: true,       // Aktifkan auto-react status
  sendTelegram: false,   // Aktifkan jika ingin meneruskan ke Telegram
};

global.key = {
  telegram: {
    token: "62XXXXXXXX:AAHXXXXXXXXXXXX", // Token dari @BotFather
    chatId: "-12345678",                 // ID chat dari userinfobot
  }
};

global.emoji = ['🔥', '😍', '😂', '💀', '😎']; // Emoji acak yang akan dikirim

📜 Lisensi

Project ini dilisensikan di bawah ISC License.

❤️ Ucapan Terima Kasih (Special Thanks)

Puji syukur dan rasa terima kasih yang tak terhingga saya sampaikan kepada:

- Allah SWT: Atas segala rahmat, kekuatan, dan petunjuk yang diberikan-Nya sehingga project ini dapat diselesaikan dengan baik. Tiada daya dan upaya kecuali dengan pertolongan-Nya.
- Orang Tua: Terima kasih yang sangat mendalam kepada Ibu dan mendiang Ayah tercinta. Doa, kasih sayang, dan dukungan kalian adalah fondasi utama serta penyemangat hidup saya dalam setiap langkah dan karya.
- Teman-Teman: Terima kasih kepada seluruh rekan di komunitas developer, khususnya tim Nex-Core, yang telah berbagi ilmu, inspirasi, dan bantuan teknis selama pengembangan script ini.
- Nazir: Selaku pengembang asli (original author) dari base script ini.

---

Recode & Managed by M. Rafel Pratama
