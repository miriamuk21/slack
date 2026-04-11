//Requere the Cron package
var CronJob = require('cron').CronJob;

//Requere the mongodb package
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://miriamsmedium:pelu212121@mediumapp.e4q9knm.mongodb.net/?appName=mediumapp";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

let joke;// the joke parameter will hold our message data

// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient insantiates a client that can call API methods
const client = new WebClient("xoxb-3687547720391-10858503901763-gxLHeUKT1jI4Ct44XVogOTHs");
// ID of the channel you want to send the message to
const channelId = "U03LK6P4ZPF";


var job = new CronJob('05 05 * * SAT', function() {
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