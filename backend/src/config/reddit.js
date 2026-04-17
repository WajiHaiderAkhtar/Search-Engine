import axios from 'axios';

export async function fetchRedditData() {
    try {
        const data = await axios.get('https://www.reddit.com/r/programming/top.json?limit=10');
        // console.log(data);
        return data.data;
    }catch(error){
        console.error("error:",error);
    }
}
// console.log(data);