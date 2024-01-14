// var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: process.env.NEXT_PUBLIC_TWITTER_API_KEY,
  consumer_secret: process.env.NEXT_PUBLIC_TWITTER_API_SK,
  access_token_key: process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.NEXT_PUBLIC_TWITTER_ACCESS_TIKEN_SECRET,
});

var params = { screen_name: "nodejs" };
client.get(
  "2/tweets/1745445979913080908",
  params,
  function (error, tweets, response) {
    if (!error) {
      console.log(tweets);
    } else {
      console.log(tweets, response);
    }
  },
);
