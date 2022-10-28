const express = require('express')
const os = require('os')
const app = express()
const port = process.env.PORT || 3000 
const host = os.hostname()
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Motus app listening on port ${port}`)
  })
  
  //////////////////////////////////////////////////////////
  ///// API POUR  MOTUS
  app.get('/', (req, res) => {
     
    res.send('Hello Motus Service')
  })
  app.get('/test', (req, res) => {
    const test = 'test'
    res.send(test)
  })

  
  app.get('/word', (req, res) => {
    const datas = readList()
    const words = datas['francais']
    const rand = datas['rand']
    const word = words[rand % words.length]
    res.send(word)
  })

  app.get('/new_word', (req, res) => {
    const datas = readList()
    const francais= datas['francais']
    const rand = datas['rand'] + Math.floor(Math.random() * 10000);
    const new_word = francais[rand % francais.length]
  res.send(new_word)
})


//////////////////////////////////////////////////////////////
/////////// SCRIPTS


function readList() {
    const fs = require('fs')

    const content = fs.readFileSync('data/liste_francais_utf8.txt', 'utf-8', (err, data) => {
        if (err) throw err;
      
        // Converting Raw Buffer to text
        // data using tostring function.
        console.log(typeof(data));
    })
    
    const francais = []
    content.split(/\r?\n/).forEach((line) => {
    
         francais.push(line)
         
      });

      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth()+1
      const year= date.getFullYear()
      
      
      const day_by_year = day*month
      
      const rand = day_by_year * year
      
      const datas = {
        francais:  francais,
        rand: rand
      };
      return datas

    }