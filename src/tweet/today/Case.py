import os
import tweepy

consumer_key = os.environ.get("TWITTER_CONSUMER_KEY")
consumer_secret = os.environ.get("TWITTER_CONSUMER_SECRET")
access_token = os.environ.get("TWITTER_ACCESS_TOKEN_KEY")
access_token_secret = os.environ.get("TWITTER_ACCESS_TOKEN_SECRET")

client = tweepy.Client(consumer_key=consumer_key,consumer_secret=consumer_secret,access_token=access_token,access_token_secret=access_token_secret)
auth = tweepy.OAuth1UserHandler(consumer_key=consumer_key,consumer_secret=consumer_secret,access_token=access_token,access_token_secret=access_token_secret)
api = tweepy.API(auth)
def read_text():
 text = ''.join(open("./plain/case/counter.message.txt", "r").readlines())
 return text
       
def format_text(text):
 return {"text": "{}".format(text)}

client.create_tweet(text = read_text())