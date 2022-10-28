const express = require('express')
const os = require('os')
const app = express()
const port = process.env.PORT || 5000 
const host = os.hostname()


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.listen(port, () => {
    console.log(`Auth app listening on port ${port}`)
  })
  
  //////////////////////////////////////////////////////////
  ///// API POUR  MOTUS
  app.get('/', (req, res) => {
     
    res.send('Hello Auth Service')
  })

  app.get('/login', (req, res) => {
    const users = readUsers()
    const username = req.query.username
    const password = req.query.password
   // console.log('LIST :',users)
    console.log('TEST : ',username,password)
    var user_loged = {

    }

    users.forEach((user,index) => {
      console.log(index,user.login,user.password)
      if (username == user.login) {
        console.log('login ok ',user.login)
        if (password == user.password) {
          console.log('MDP ok ',user.password)
          user_loged = {
            login:user.login,
            password:user.password
          }
        } else {
          console.log('ERREUR MDP')
        }
      } else {
        console.log('NON, suivant')
      }
    });
    console.log(user_loged)
    res.send(user_loged)
  })

  app.get('/register', (req, res) => {
    const fs=require('fs')
    console.log('register')
    var erreur = 0
    const users = readUsers()
    const username = req.query.username
    const password = req.query.password
    const confirm_password = req.query.confirm_password
   // console.log('LIST :',users)
    console.log('TEST : ',username,password,confirm_password)
    if (password != confirm_password) {
      erreur = "Les mdp ne correspondent pas"
      console.log(erreur)
    }else
    {
      users.forEach((user,index) => {
        console.log(user.login,user.password)
        if (username==user.login) {
          erreur  = "Login déjà utilisé"
          console.log(erreur)
        }
      })
    }
    var datas = {

    }
    console.log('erreur :',erreur)
    // SI pas d'erreur alors on enregistre
    if (erreur == 0) {
      const new_user = {
        login:username,
        password:password
      }
      const new_score = {
        login:username,
        score:0,
        avg_tries:0
      }
      datas = {
        new_user:new_user,
        new_score:new_score
      }
      var final_users = users
      final_users.push(new_user)

      fs.writeFile('./data/auth.json', JSON.stringify(final_users,null,2), function writeJSON(err) {
        if (err) return console.log(err);
      });

    } else{
      datas = {
        erreur:erreur
      }
    }
    
    
    res.send(datas)
  })

/////////////////////////////////////////////
/// SCRIPTS

function readUsers() {
  const users = require('./data/auth.json')  
  return users
}

function getUserBylogin(user,data) {
  return data.filter(
      function(data){ return data.login == user }
  );
}