const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Отримання токена з .env файлу
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Отримання аргументів з командного рядка
const args = process.argv.slice(2); // Пропускаємо перші два аргументи
if (args.length < 1) {
  console.log("Використання: node script.js <MESSAGE>");
  process.exit(1);
}

const [...messageParts] = args;
const message = messageParts.join(' ');

// URL для Telegram API
const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// Відправка повідомлення
async function sendMessage() {
  try {
    const response = await axios.post(telegramApiUrl, {
      chat_id: CHAT_ID,
      text: message,
    });
    console.log("Повідомлення успішно надіслано");
  } catch (error) {
    console.error("Помилка при відправці повідомлення:", error.response?.data || error.message);
  }
}

sendMessage();