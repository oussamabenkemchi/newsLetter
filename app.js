const express = require('express')
const bodyParser= require('body-parser');
const request = require('request');
const https = require('https');
const { static } = require('express');
const { dirname } = require('path');


const app= express();
app.use(static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html')
})


 /* app.post('/',function(req,res){
    const fname= req.body.firstName
    const lname= req.body.lastName
    const email = req.body.email
    //console.log(fname+"  "+lname + "  "+email)

    const data = {
        members : {
            email_address: email,
            status:'subscribed',
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            } 
         }  }

    const jsonData= JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/325191af0b/members"
    const options = {
        method:"POST",
        auth:'oussamabenkemchi:23eeff8e4a387f460d81d4c467eac11b-us7'
     }
    
    const request =  https.request(url,options,function(response){
        console.log('sending request ...'+jsonData)
         response.on('data',function(data){
             console.log(JSON.parse(data))
         })   
    }) 

    request.write(jsonData);
    request.end();
}) */





 app.post('/',function(req,res){
    const fname= req.body.firstName
    const lname= req.body.lastName
    const email = req.body.email
    //console.log(fname+"  "+lname + "  "+email)
   

    const url = "https://api.sendinblue.com/v3/contacts/"

    const data = {
            email:email,
            attributes : {
                FIRSTNAME:fname,
                LASTNAME:lname
            },
            listIds:[2]
     }
    
    const jsonData= JSON.stringify(data);
    
    const options = {
          
            method:"POST",
            headers: 
                {
                    'accept':'application/json',
                    'api-key':'x keysib-fd5211ab6b9337870a3b599d9e9da63add98a17c0d7cced49f4c8e1cd00ca7c8-2BNtpAW4GyVm9KvH',
                    'content-type':'application/json'
                }
    }
        
    const request =  https.request(url,options,function(response){
            console.log('sending request ...'+jsonData)
            console.log(response.statusCode)
            if(response.statusCode<300){
                    response.on('data',function(data){
                    console.log(request)
                    console.log(JSON.parse(data))
                })   
                res.sendFile(__dirname+'/success.html')
            }
            else{
                res.sendFile(__dirname+'/failure.html')

            }
             
    }) 
    
    request.write(jsonData);
    request.end();
}) 


app.post('/failure',function(req,res){
    res.redirect('/')
})


app.listen(process.env.PORT || 3000,function(){
    console.log('server starts listen at 3000');
})


//c52ade7e130a480b127e97fe4b160e23-us7
//325191af0b
//23eeff8e4a387f460d81d4c467eac11b-us7