var CronJob = require('cron').CronJob;
const { MongoClient } = require('mongodb');
const { WebClient } = require("@slack/web-api");

const mongouri = process.env.MONGO_URI;
const client = new WebClient(process.env.SLACK_TOKEN);
const channelId = "C0AS7BGCPBP"; // real channel ID

var job = new CronJob(
  '50 00 * * SUN',
  async function () {
    const mongoClient = new MongoClient(mongouri);

    try {
      await mongoClient.connect();
      const db = mongoClient.db('slackapp');
      const messagesCollection = db.collection('messages');

      const joke = await messagesCollection.findOne({ nextup: true });

      if (!joke) {
        console.log("No message found");
        return;
      }

      await client.chat.postMessage({
        channel: channelId,
        text: "Scheduled message",
        blocks: [
          {
            type: "section",
            text: { type: "mrkdwn", text: joke.setup }
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: joke.punch }
          }
        ]
      });

    } catch (error) {
      console.error(error);
    } finally {
      await mongoClient.close();
    }
  },
  null,
  true,
  'America/Tegucigalpa'
);