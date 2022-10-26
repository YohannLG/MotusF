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

