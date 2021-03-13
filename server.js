const csv = require('csvtojson')
const express = require('express')
const util = require('util')

const port = process.env.PORT || 37037

const title = 'Corona-Fallzahlen im Landkreis Göttingen'
const gemeinden = require('./gemeinden.json') 

const app = express()
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)
app.get('/', (req, res) => res.render('index.html'))
app.use(express.static('docs'))
app.get('/kill', (req, res) => process.exit())

const nameIndex = gemeinden.reduce((obj, g) => { obj[g.name]=g; g.zahlen=[]; return obj }, {})
const lkz = nameIndex['Landkreis Göttingen'].zahlen = []

csv().fromFile('fallzahlen.csv').then(fallzahlen => {
  const latest = fallzahlen.slice(-1)[0]

  var datum = new Date(latest.datum)
  app.locals = {
    gemeinden, title, util, datum, quelle: latest.quelle,
    differenzInTagen: (a,b) => (a-b) / (1000 * 60 * 60 * 24),
  }

  datum = undefined
  fallzahlen.forEach(row => {
    const region = nameIndex[row.gemeinde]
    if (!region) return // filter out "Samtgemeinde Hattorf am Harz und Stadt Herzberg am Harz"
    
    row.datum = new Date(row.datum)
    region.zahlen.push(row)
    if (datum && datum.getTime() == row.datum.getTime()) {
      lkz[lkz.length-1].faelle += 1*row.faelle
      lkz[lkz.length-1].infizierte += 1*row.infizierte        
    } else {
      lkz.push({ datum, faelle: 1*row.faelle, infizierte: 1*row.infizierte, gemeinde: "Landkreis Göttingen"})
      datum = row.datum
    }
  })

  app.listen(port, () => console.log(`http://localhost:${port}/`))
})
