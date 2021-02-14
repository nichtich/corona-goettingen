const csv = require('csvtojson')
const express = require('express')
const util = require('util')

const port = 37037
const title = 'Corona-Fallzahlen im Landkreis Göttingen'
const gemeinden = require('./gemeinden.json') 

const app = express()
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)
app.get('/', (req, res) => res.render('index.html'))
app.use(express.static('docs'))

const nameIndex = gemeinden.reduce((obj, g) => { obj[g.name]=g; g.zahlen=[]; return obj }, {})

csv().fromFile('fallzahlen.csv').then(fallzahlen => {
  fallzahlen.forEach(row => {
    const region = nameIndex[row.gemeinde]
    if (region) region.zahlen.push(row)
  })
  app.locals = { gemeinden, title, util, fallzahlen }
  app.listen(port, () => console.log(`http://localhost:${port}/`))
})
