const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateCertificate = (data, path) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      layout: 'landscape',
      size: 'A4',
    });

    doc.pipe(fs.createWriteStream(path));

    // Design the certificate
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke('#4F46E5');

    doc.fontSize(40).fillColor('#1F2937').text('Certificate of Achievement', 0, 100, { align: 'center' });
    
    doc.fontSize(20).text('This is to certify that', 0, 180, { align: 'center' });
    
    doc.fontSize(30).fillColor('#4F46E5').text(data.studentName, 0, 220, { align: 'center' });
    
    doc.fontSize(20).fillColor('#1F2937').text(`has successfully participated in the event`, 0, 280, { align: 'center' });
    
    doc.fontSize(25).fillColor('#7C3AED').text(data.eventName, 0, 320, { align: 'center' });
    
    doc.fontSize(15).fillColor('#6B7280').text(`Organized by ${data.collegeName}`, 0, 380, { align: 'center' });
    
    doc.fontSize(12).text(`Issued on: ${new Date().toLocaleDateString()}`, 0, 450, { align: 'center' });

    doc.end();
    
    doc.on('finish', () => resolve(path));
    doc.on('error', (err) => reject(err));
  });
};

module.exports = generateCertificate;
