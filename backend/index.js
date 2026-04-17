import { fetchRedditData } from './src/config/reddit.js';
import {startServer , app} from './src/server.js';
import {client} from './src/db/dbconnect.js';


app.get('/reddit', async (req,res)=>{
    const rdata = await fetchRedditData();
    const data = rdata.data.children;
    res.json(data);

    const timestampConverter = ts => new Date(ts * 1000).toISOString().replace("T", " ").replace("Z", "+00");


    try{
        data.forEach(async (item)=>{
        const id = item.data.id;
        const title = item.data.title;
        const content = item.data.selftext;
        const is_self = item.data.is_self;
        const url = item.data.url;
        const subreddit = item.data.subreddit;
        const author = item.data.author;
        const created_utc = item.data.created_utc;
        const created_at = timestampConverter(created_utc);
        const upvote_ratio = item.data.upvote_ratio;
        const num_comments = item.data.num_comments;
        const score = item.data.score;

        const inquery = `INSERT INTO posts (id,title,content,is_self,url,subreddit,author,upvote_ratio,num_comments,score,created_at) VALUES ($1 , $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
        const inject = await client.query(inquery,[id,title,content,is_self,url,subreddit,author,upvote_ratio,num_comments,score,created_at]);
        
        console.log(inject);
    })
    }catch(err){
        console.log(err);
    }
});

startServer();