const express = require('express')
const os = require('os')
const app = express()
const port = process.env.PORT || 4000 
const host = os.hostname()


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.listen(port, () => {
    console.log(`Score app listening on port ${port}`)
  })
  
  //////////////////////////////////////////////////////////
  ///// API POUR  MOTUS
  app.get('/', (req, res) => {
     
    res.send('Hello Score Service')
  })

  app.get('/get_score', (req, res) => {
    const user = req.query.user
    const listUsers = readUsers()
    console.log('user : ',user)
    console.log('LIST : ',listUsers)

    var find_score = getScoreByUser(user,listUsers)

    console.log('find_score : ',typeof(find_score[0]),find_score[0])
    res.send(find_score[0])
  })
/////////////////////////////////////////////////////////////
//////////////SCRIPTS

function readUsers() {
  const users = require('./data/scores.json')  
  return users
}

function getScoreByUser(user,data) {
  return data.filter(
      function(data){ return data.login == user }
  );
}