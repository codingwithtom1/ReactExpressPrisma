// Import the crypto module
const crypto = require('crypto');
const fs = require('fs');

// Generate a 2048-bit RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Export the keys in PEM format
const publicKeyPem = publicKey.export({
  type: 'pkcs1',
  format: 'pem',
});
const privateKeyPem = privateKey.export({
  type: 'pkcs1',
  format: 'pem',
});

fs.writeFile('../public.pem', publicKeyPem, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Public key saved to public.pem');
  }
});

// Write the private key to private.pem
fs.writeFile('../private.pem', privateKeyPem, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Private key saved to private.pem');
  }
});