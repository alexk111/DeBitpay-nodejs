require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const hbs = require('hbs')
const hbsLayouts = require('handlebars-layouts')
const hbsHelpers = require('./lib/hbsHelpers')
const fnGetPaymentData = require('./lib/fnGetPaymentData')

const fnPaymentLinkToInvId = require('./lib/paymentLinks').paymentLinkToInvId
const fnInvIdToPaymentLink = require('./lib/paymentLinks').invIdToPaymentLink

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('satsToBTC', hbsHelpers.satsToBTC)
hbs.registerHelper(hbsLayouts(hbs.handlebars))

const SERVER_PORT = process.env.SERVER_PORT || 4000
const SERVER_HOST = process.env.SERVER_HOST || 'localhost'

app.use('/static', express.static('static', {
  fallthrough: false
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('pages/index.hbs')
})

app.post('/', (req, res) => {
  if (req.body.bitpayLink) {
    const invId = fnPaymentLinkToInvId(req.body.bitpayLink)
    res.redirect(`/invoice?id=${invId}`)
  } else {
    res.redirect('/')
  }
})

app.get('/invoice', async (req, res) => {
  if (req.query.id) {
    console.log(`*** Reading Invoice #${req.query.id} ***`)
    const bitpayLink = fnInvIdToPaymentLink(req.query.id)
    try {
      const paymentData = await fnGetPaymentData(bitpayLink)
      res.render('pages/payment.hbs', {
        paymentData: paymentData
      })
    } catch (e) {
      res.render('pages/error.hbs', {
        message: e.message
      })
    }
  } else {
    res.redirect('/')
  }
})

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`*** I'm alive on ${SERVER_HOST}:${SERVER_PORT} ***`)
})
