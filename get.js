const axios = require('axios');
require('dotenv').config();

// Ваш токен Telegram-бота
const BOT_TOKEN = process.env.BOT_TOKEN;
const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`;

async function getChatId() {
  try {
    const response = await axios.get(telegramApiUrl);
    const updates = response.data.result;

    // Якщо є нові повідомлення
    if (updates.length > 0) {
      updates.forEach(update => {
        console.log(`chatId: ${update.message.chat.id}`);
        console.log(`Text: ${update.message.text}`);
      });
    } else {
      console.log('Немає нових повідомлень. Відправте повідомлення боту!');
    }
  } catch (error) {
    console.error('Помилка:', error.response?.data || error.message);
  }
}

getChatId();