# DeBitpay *(NodeJS edition)*

This is a server-side NodeJS version of DeBitpay. [More about DeBitpay...](https://github.com/alexk111/DeBitpay)

## What is this edition for?

Bitpay Payment protocol has an additional layer of security which creates a hash digest and puts it in the response header before sending the Bitcoin transaction details. This enables us to create own hash digest for the received data, compare the two hashes and be sure that the data hasn't been modified by a man-in-the-middle.

For some reason responses from Bitpay server don't have 'digest' in [Access-Control-Expose-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers). That causes browsers to prohibit access to the digest data created by Bitpay. As the original DeBitpay is executed in Browser, it can't get the digest. That's why I had to skip the hash verification in the original client-side DeBitpay and created the alternative NodeJS version for those who want that additional layer of security implemented by Bitpay. Maybe in future Bitpay servers would allow browsers to access the digest data and we could enable the verification in the original DeBitpay (the verification code is already there, commented out at this moment).

Actually that hash verification adds not so much, if you use DeBitpay to decode HTTPS Bitpay payment links. Because the HTTPS data is encrypted, MITM wouldn't be able to make any changes to the traffic. So if an invoice link begins with "**https**://bitpay.com/invoice?id=" or a payment link begins with "bitcoin:?r=**https**://bitpay.com/i/", it's secure to use.

Use this edition of DeBitpay if you want to enable the hash verification skipped in the original DeBitpay.

## Install

1. [Download DeBitpay - NodeJS edition](https://github.com/alexk111/DeBitpay-nodejs/archive/master.zip) from GitHub.
2. Unpack the downloaded zip and install dependencies:

```
npm install
```

## Launch

```
npm start
```

## Open

Open in your web browser:

```
localhost:8080
```

## Changing host/port

To change the host/port, modify the host/port values in the *.env* file.

## License

MIT © Alex Kaul
