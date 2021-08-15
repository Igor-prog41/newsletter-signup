const express =require('express');
const https = require ('https');
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));  //what is it? (access to shared folders )

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
})

app.post('/',(req,res)=>{
    
   const firstName = req.body.fname;
   const lastName = req.body.lname;
   const email = req.body.email;

  //    console.log(firstName +'  '+ lastName +"  "+ email );
   
    const data = {
        members: [
            {      
                 "email_address": email,
                 "status": "subscribed",
                    "merge_fields": {
                    "FNAME": firstName,
                    "LNAME": lastName 
                 }   
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    console.log(jsonData );

    const url ="https://us6.api.mailchimp.com/3.0/lists/5a96f050d2";

    const options={
        method:"POST",
        auth:"igor:122f85ca0f26ca209a1d75cb42ce4ea8-us6"
    }

    const request = https.request(url,options,function(response){

        if (response.statusCode ===200) {
            res.sendFile(__dirname+'/success.html');
        }
        else{
            res.sendFile(__dirname+'/failure.html');
        }

        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })


    request.write(jsonData);
    request.end();   
})

app.post('/failure',function(req,res){
    res.redirect('/');
})

app.listen(process.env.PORT || port,()=>{
    console.log(`listen port - ${port}`);
})


// API key
// 122f85ca0f26ca209a1d75cb42ce4ea8-us6

// end point
// https://us6.api.mailchimp.com/3.0/

// list ID
// 5a96f050d2





