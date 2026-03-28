import {Client} from 'pg'

const client = new Client("postgresql://neondb_owner:npg_ZbItmVCSc8M2@ep-restless-scene-ajme07ce.c-3.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require")

export async function connectdb() {
    try{
        // throw new Error("Simulated connection error");
        await client.connect();
        console.log("DB connected successfully");
        const res = await client.query(`INSERT INTO posts (id,title,content,subreddit,score,created_time) VALUES ('1','testing', 'this is a test post', 'testsubreddit',100, '2026-03-29 02:38:00')`);
        console.log("Insert result:", res);
    } catch (err) {
        console.error("Error connecting to DB:", err);
    }
}

