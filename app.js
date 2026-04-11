//Requere the Cron package
var CronJob = require('cron').CronJob;

// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient insantiates a client that can call API methods
const client = new WebClient("xoxb-3687547720391-10858503901763-gxLHeUKT1jI4Ct44XVogOTHs");
// ID of the channel you want to send the message to
const channelId = "U03LK6P4ZPF";


var job = new CronJob('53 00 * * SAT', function() {
 //OUR CODE FOR SENDING A MESSAGE
    (async () => {
    try {
      // Call the chat.postMessage method using the WebClient
      const result = await client.chat.postMessage({
        channel: channelId,
        text: "Testing end-to-end with custom timing",
        	"blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "* - Why did my Exotic Bird Startup Store fail?*"
              }
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": " - I didn't have enough seed money."
              }
            },
            {
              "type": "image",
              "image_url": "https://cdn.pixabay.com/photo/2017/08/09/15/32/jokers-2614901_1280.jpg",
              "alt_text": "delicious tacos"
            }
          ]
      });

      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
    })();
});
job.start();