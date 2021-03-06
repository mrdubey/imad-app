var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool

var config={
    user:"sndpdby28",
    database:"sndpdby28",
    host:"db.hasura-app.io",
    port:"5432",
    password : process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles =
{
   'article-one':{
    title:"Article One | sandeep dubey",
    heading:"Article One ",
    date:"sep 5,2016",
    content:`<p>djskfsfjdksjfdhxfjbnvlcfsoivljvdsoflosurghfusofhruhfufhfugdhgdughdfoshfrufhsfudfhoghsdhgiodf
</p>
<p>djskfsfjdksjfdhxfjbnvlcfsoivljvdsoflosurghfusofhruhfufhfugdhgdughdfoshfrufhsfudfhoghsdfihfdf
</p>
<p>djskfsfjdksjfdhxfjbnvlcfsoivljvdsoflosurghfusofhruhfufhfugdhgdughdfoshfrufhsfudfhoghsdfihfdf
</p>`
},
   'article-two': {
    title:"Article Two | sandeep dubey",
    heading:"Article Two ",
    date:"sep 15,2016",
    content:`<p>djskfsfjdksjfdhxfjbnvlcfsoivljvdsoflosurghfusofhruhfufhfugdhgdughdfoshfrufhsfudfhoghsdhgiodf
</p>
<p>djskfsfjdksjfdhxfjbnvlcfsoivljvdsoflosurghfusofhruhfufhfugdhgdughdfoshfrufhsfudfhoghsdfihfdf
</p>
<p>djskfsfjdksjfdhxfjbnvlcfsoivljvdsoflosurghfusofhruhfufhfugdhgdughdfoshfrufhsfudfhoghsdfihfdf
</p>`
},
   'article-three':{
    title:"Article One | sandeep dubey",
    heading:"Article Three ",
    date:"sep 25,2016",
    content:`<p>djskfsfjdksjfdhxfjbnvlcfsoivljvdsoflosurghfusofhruhfufhfugdhgdughdfoshfrufhsfudfhoghsdhgiodf
</p>
<p>djskfsfjdksjfdhxfjbnvlcfsoivljvdsoflosurghfusofhruhfufhfugdhgdughdfoshfrufhsfudfhoghsdfihfdf
</p>
<p>djskfsfjdksjfdhxfjbnvlcfsoivljvdsoflosurghfusofhruhfufhfugdhgdughdfoshfrufhsfudfhoghsdfihfdf
</p>`
    }
};
var pool=new Pool(config);
app.get('/test-db',function(req,res)
{
    pool.query("SELECT * FROM test",function(err,res){
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result));
        }
    })
    
});

function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
var htmlTemplate=
    `<html>
   <head>
       <title>
       ${title}
       </title>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>  
 <link href="/ui/style.css" rel="stylesheet" />
</head>
   <body>
       <div class="container">
<div>
<a href='/'>Home</a>
</div>
<hr/>
<h3>
${heading}
</h3>
<div>
${date}
</div>
<div>
   ${content}
</div>
</div>
</body>
</html>`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});
app.get('/:articleName', function (req,res){
    //articleName=article-one
    //artcilesName=req.params.articles[articleName]
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var names=[];
app.get('/submit-name/name',function(req,res){
    //get the current name form the request
    var name=req.params.name;//TODO
    
    names.push(name);
    //JSON
    res.send(JSON.stringify(names));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
