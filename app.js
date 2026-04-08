// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient insantiates a client that can call API methods
const client = new WebClient("xoxb-3687547720391-10858503901763-gxLHeUKT1jI4Ct44XVogOTHs");
// ID of the channel you want to send the message to
const channelId = "U03LK6P4ZPF";
(async () => {
try {
  // Call the chat.postMessage method using the WebClient
  const result = await client.chat.postMessage({
    channel: channelId,
    text: "Hello world from my computer"
  });

  console.log(result);
}
catch (error) {
  console.error(error);
}
})();