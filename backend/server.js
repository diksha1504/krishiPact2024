// const express = require('express');
// const PDFDocument = require('pdfkit');
// const { PassThrough } = require('stream');
// const cors = require('cors'); // Import cors
// const app = express();
// const port = 5000;

// app.use(cors()); // Use cors middleware
// app.use(express.json());

// app.post('/generate-contract', (req, res) => {
//     const { farmerName, buyerName, date, amount, contractDuration } = req.body;

//     console.log('Received data:', req.body); // Input data ko print karo

//     const doc = new PDFDocument();
//     const stream = new PassThrough();

//     doc.pipe(stream);

//     doc.fontSize(18).text('Contract Agreement', { align: 'center' });
//     doc.moveDown();

//     doc.fontSize(14).text('This Contract Agreement is made on the following date:', { underline: true });
//     doc.fontSize(12).text(`Date: ${date}`);
//     doc.moveDown();

//     doc.fontSize(14).text('Between:', { underline: true });
//     doc.fontSize(12).text(`Farmer Name: ${farmerName}`);
//     doc.fontSize(12).text(`Buyer Name: ${buyerName}`);
//     doc.moveDown();

//     doc.fontSize(14).text('Contract Details:', { underline: true });
//     doc.fontSize(12).text(`Amount: ${amount}`);
//     doc.fontSize(12).text(`Contract Duration: ${contractDuration}`);
//     doc.moveDown();

//     doc.fontSize(14).text('Signatures:', { underline: true });
//     doc.fontSize(12).text('Farmer Signature: _____________________');
//     doc.fontSize(12).text('Buyer Signature: _____________________');

//     doc.end();

//     stream.pipe(res); // PDF ko response mein send karo

//     console.log('PDF generation complete.'); // PDF generate hone par log karo
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/generate-contract', (req, res) => {
    const { farmerName, buyerName, date, amount, contractDuration, signature } = req.body;

    console.log('Received data:', req.body); // Input data ko print karo

    const doc = new PDFDocument();
    const stream = new PassThrough();

    doc.pipe(stream);

    doc.fontSize(18).text('Contract Agreement', { align: 'center' });
    doc.moveDown();

    doc.fontSize(14).text('This Contract Agreement is made on the following date:', { underline: true });
    doc.fontSize(12).text(`Date: ${date}`);
    doc.moveDown();

    doc.fontSize(14).text('Between:', { underline: true });
    doc.fontSize(12).text(`Farmer Name: ${farmerName}`);
    doc.fontSize(12).text(`Buyer Name: ${buyerName}`);
    doc.moveDown();

    doc.fontSize(14).text('Contract Details:', { underline: true });
    doc.fontSize(12).text(`Amount: ${amount}`);
    doc.fontSize(12).text(`Contract Duration: ${contractDuration}`);
    doc.moveDown();

    doc.fontSize(14).text('Signatures:', { underline: true });
    doc.fontSize(12).text('Farmer Signature: _____________________');
    doc.fontSize(12).text('Buyer Signature: _____________________');
    doc.moveDown();

    // Add signature image
    if (signature) {
        doc.image(Buffer.from(signature.split(',')[1], 'base64'), { fit: [150, 150], align: 'center' });
    }

    doc.end();

    stream.pipe(res); // PDF ko response mein send karo

    console.log('PDF generation complete.'); // PDF generate hone par log karo
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
