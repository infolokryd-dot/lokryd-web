const fs = require('fs');
const path = require('path');

function extractImagesFromPdf(pdfPath, prefix) {
  if (!fs.existsSync(pdfPath)) {
    console.log('File not found:', pdfPath);
    return;
  }
  const buf = fs.readFileSync(pdfPath);
  console.log('Extracting from:', pdfPath, 'size:', buf.length);
  
  let pos = 0;
  let count = 0;
  while (true) {
    const streamIdx = buf.indexOf(Buffer.from('stream'), pos);
    if (streamIdx === -1) break;
    
    const lookback = buf.slice(Math.max(0, streamIdx - 500), streamIdx).toString('latin1');
    if (lookback.includes('/DCTDecode')) {
      let dataStart = streamIdx + 6;
      while (dataStart < buf.length && (buf[dataStart] === 0x0D || buf[dataStart] === 0x0A)) {
        dataStart++;
      }
      
      const endStreamIdx = buf.indexOf(Buffer.from('endstream'), dataStart);
      if (endStreamIdx !== -1) {
        let dataEnd = endStreamIdx;
        while (dataEnd > dataStart && (buf[dataEnd - 1] === 0x0D || buf[dataEnd - 1] === 0x0A)) {
          dataEnd--;
        }
        
        const imgBuf = buf.slice(dataStart, dataEnd);
        if (imgBuf[0] === 0xFF && imgBuf[1] === 0xD8) {
          const outName = 'pdf-' + prefix + '-' + count + '-' + imgBuf.length + '.jpg';
          const outPath = path.join(__dirname, '../public/images/transport', outName);
          fs.writeFileSync(outPath, imgBuf);
          console.log('Extracted JPEG:', outName, 'bytes:', imgBuf.length);
          count++;
        }
      }
    }
    pos = streamIdx + 6;
  }
  console.log('Total extracted for', prefix, ':', count);
}

const outDir = path.join(__dirname, '../public/images/transport');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

extractImagesFromPdf('D:/LOKRYD/Company Profile - Lokryd -1.pdf', 'cp');
extractImagesFromPdf('D:/LOKRYD/Lokryd Employee Transport Profile.pdf', 'etp');
