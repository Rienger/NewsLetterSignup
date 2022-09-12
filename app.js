const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();





app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/signup.html')

})


//POST REQUEST FOR HOME ROUTE
app.post('/', function(req, res){

  const firstName =  req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };


  const jsonData = JSON.stringify(data);

  const url = 'https://us5.api.mailchimp.com/3.0/lists/0f9859bb95'

  const options = {
    method: 'POST',
    auth: 'james:1d97f4072b194addb8681e8fcb9deeb9-us5'
  }


  const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    }else{
      res.sendFile(__dirname + '/failure.html');
    }

    response.on('data', function(data){
      console.log(JSON.parse(data));
    })

  })

  request.write(jsonData);
  request.end();

});







//POST REQUEST FOR FAILURE ROUTE

app.post('/failure', function(req, res){
  res.redirect('/')
});










app.listen(process.env.PORT || 3000, function(req, res){

  console.log('Server is running on port 3000')



})







//API key
// 1d97f4072b194addb8681e8fcb9deeb9-us5


//List id
// 0f9859bb95
