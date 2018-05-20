module.exports = {
  invIdToPaymentLink: invIdToPaymentLink,
  paymentLinkToInvId: paymentLinkToInvId
}

const LINK_PREFIX = 'bitcoin:?r=https://bitpay.com/i/'

function paymentLinkToInvId (paymentLink) {
  let pos = paymentLink.indexOf(LINK_PREFIX)
  if (pos > -1) {
    return paymentLink.substr(pos + LINK_PREFIX.length)
  }
  pos = paymentLink.indexOf('?id=')
  if (pos > -1) {
    return paymentLink.substr(pos + 4)
  }
  return paymentLink
}

function invIdToPaymentLink (invId) {
  return LINK_PREFIX + invId
}
