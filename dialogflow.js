const Dialogflow = require("dialogflow");
const configs = require("./key");
const sessionClient = new Dialogflow.SessionsClient({
  projectId: configs.project_id,
  credentials: {
    private_key: configs.private_key,
    client_email: configs.client_email,
  },
});

async function sendMessage(id, message) {
  const sessionPath = sessionClient.sessionPath(configs.project_id, id);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "pt-BR",
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  console.error(result);
  return {
    text: result.fulfillmentText,
    intent: result.intent.displayName,
    fields: result.parameters.fields,
  };
}

module.exports.sendMessage = sendMessage;
