const JsonPaymentProtocol = require('json-payment-protocol')

module.exports = getPaymentData

async function getPaymentData (bitpayLink) {
  const paymentProtocol = new JsonPaymentProtocol()

  const paymentRequest = await paymentProtocol.getRawPaymentRequestAsync(bitpayLink)
  const parsedData = await paymentProtocol.parsePaymentRequestAsync(paymentRequest.rawBody, paymentRequest.headers)

  return parsedData
}
