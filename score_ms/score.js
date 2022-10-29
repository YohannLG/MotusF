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


  app.get('/update_score', (req, res) => {
    const fs = require('fs')
    const user = req.query.user
    const new_score = req.query.score
    const new_avg = req.query.avg_tries
    const listUsers = readUsers()
    console.log('new_score : ',new_score)
    console.log('new_avg : ',new_avg)

    console.log('LIST : ')
let pos = -1
  for (let i = 0; i < listUsers.length; i++) 
  {
    if (listUsers[i].login==user) {
      pos = i
    }
  }
  listUsers[pos].score = parseInt(new_score)
  listUsers[pos].avg_tries = parseFloat(new_avg)
  console.log('trouvé : ',listUsers[pos])
  console.log('List complete : ',listUsers)
  


    fs.writeFile('./data/scores.json', JSON.stringify(listUsers,null,2), function writeJSON(err) {
      if (err) return console.log(err);
    });
    res.send(listUsers)
  })



  app.get('/new_score', (req, res) => {
    const fs = require('fs')
    const user = req.query.user
    const new_score = req.query.score
    const new_avg = req.query.avg_tries
    var listUsers = readUsers()
    console.log('score : ',new_score)
    console.log('avg : ',new_avg)

    console.log('LIST  AVANT: ',listUsers)
  
    const new_user_score = {
      login:user,
      score:parseInt(new_score),
      avg_tries:parseFloat(new_avg)
    }

    var final_users = listUsers
    final_users.push(new_user_score)

    fs.writeFile('./data/scores.json', JSON.stringify(final_users,null,2), function writeJSON(err) {
      if (err) return console.log(err);
    });
    listUsers = readUsers()
    console.log('LIST  Apres: ',listUsers)
    res.send(listUsers)
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