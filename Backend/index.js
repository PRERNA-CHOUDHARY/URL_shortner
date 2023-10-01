import express from "express";
import randomstring from "randomstring";
const app=express();

let url_store=new Map();
let short_url_store=new Set();
let url_store2=new Map();
app.use(express.json());

function shorten(req,res){
    let originalUrl= req.body.url;
    console.log(short_url_store);
    console.log(url_store);
    console.log(url_store2);
    if(originalUrl==null) res.send({"error":"no url given"})
    if(url_store.get(originalUrl)) // generate url if not available
        res.send({
    'short_url' :url_store.get(originalUrl)});
    else{
    let short_url=null;
    while(short_url==null) // to generate unique url
    {
        short_url=randomstring.generate(7);
        if(short_url_store.has(short_url))
            short_url=null;
    }
    url_store.set(originalUrl,short_url);
    url_store2.set(short_url,originalUrl);
    short_url_store.add(short_url);
    res.send({'short_url':short_url});
    }
}


function retriveUrl(req,res){
    
    let short_url=req.headers.short_url;
    console.log(short_url);
    // if(short_url==undefined) res.send({"error":"no url given"})
    let originalUrl=url_store2.get(short_url);
    res.send({
        'originalUrl':originalUrl
    });
}
//send api to backend
app.post('/shorten',shorten);
app.get('/retriveUrl',retriveUrl);

const PORT=3059;

app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`)
})