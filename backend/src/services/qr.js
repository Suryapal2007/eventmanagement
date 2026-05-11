const QRCode = require('qrcode');

const generateQRCode = async (text) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text);
    return qrCodeDataUrl;
  } catch (err) {
    console.error('Error generating QR code', err);
    throw err;
  }
};

module.exports = generateQRCode;
