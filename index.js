require("dotenv/config");
const TelegramBot = require("node-telegram-bot-api");
const dialogflow = require("./dialogflow");
const youtube = require("./youtube");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on("message", async (message) => {
  const id = message.chat.id;
  const dfResponse = await dialogflow.sendMessage(id.toString(), message.text);
  console.log(dfResponse);
  let responseText = dfResponse.text;
  if (dfResponse.intent === "Treino específico") {
    responseText = await youtube.searchVideoURL(
      responseText,
      dfResponse.fields.Corpo.stringValue
    );
  }
  bot.sendMessage(id, responseText);
});
