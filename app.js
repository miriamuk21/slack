//Requere the Cron package
var CronJob = require('cron').CronJob;

//Requere the mongodb package
const { MongoClient } = require('mongodb');
const mongouri = "mongodb+srv://miriamsmedium:pelu212121@mediumapp.e4q9knm.mongodb.net/slackapp?retryWrites=true"
let joke;// the joke parameter will hold our message data

// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient insantiates a client that can call API methods
const client = new WebClient("xoxb-3687547720391-10858503901763-gxLHeUKT1jI4Ct44XVogOTHs");
// ID of the channel you want to send the message to
const channelId = "C0AS7BGCPBP";


var job = new CronJob('00 01 * * SUN', function() {
 //OUR CODE FOR SENDING A MESSAGE
    (async () => {

    // Create a new MongoClient
      let mongoClient = new MongoClient(mongouri, {
        useUnifiedTopology: true 
        })
        try {
            // Connect the client to the server
            await mongoClient.connect();
            let db = mongoClient.db('slackapp')//set the reference to the connected slackapp database as db
            
            //get the joke data
            let messagesCollection = db.collection('messages')// set the reference to the messages collection as messagesCollection
            joke=await messagesCollection.findOne({ nextup: true }) // this line will find one document in the messages collection that has the nextup value set to true, and store this document and its content as parameter named joke
    
            
        } catch (errormongo) {
            console.error(errormongo);
            }
      
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
                "text": joke.setup
              }
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": joke.punch
              }
            },
            {
              "type": "image",
              "image_url": joke.image,
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