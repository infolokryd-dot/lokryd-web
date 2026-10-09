const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function createPng(width, height, rgbaBuffer) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth 8
  ihdr.writeUInt8(6, 9); // color type 6: RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  const ihdrChunk = makeChunk('IHDR', ihdr);

  const scanlineLen = width * 4 + 1;
  const rawScanlines = Buffer.alloc(height * scanlineLen);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLen;
    rawScanlines[rowOffset] = 0;
    rgbaBuffer.copy(rawScanlines, rowOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(rawScanlines);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crcBuf]);
}

const pdfPath = 'D:/LOKRYD/Company Profile - Lokryd -1.pdf';
const buf = fs.readFileSync(pdfPath);
const str = buf.toString('latin1');

function getObjectStream(id) {
  const header = `${id} 0 obj`;
  const idx = str.indexOf(header);
  if (idx === -1) return null;
  const endObj = str.indexOf('endobj', idx);
  const objStr = str.slice(idx, endObj);
  
  const wMatch = objStr.match(/\/Width\s+(\d+)/);
  const hMatch = objStr.match(/\/Height\s+(\d+)/);
  const sMaskMatch = objStr.match(/\/SMask\s+(\d+)\s+0\s+R/);
  
  const streamStart = str.indexOf('stream', idx);
  if (streamStart === -1 || streamStart > endObj) return null;
  let dataStart = streamStart + 6;
  if (str[dataStart] === '\r' && str[dataStart + 1] === '\n') dataStart += 2;
  else if (str[dataStart] === '\n' || str[dataStart] === '\r') dataStart += 1;
  const streamEnd = str.indexOf('endstream', dataStart);
  
  const rawStream = buf.subarray(dataStart, streamEnd);
  let decomp;
  try {
    decomp = zlib.inflateSync(rawStream);
  } catch (e) {
    decomp = rawStream;
  }
  
  return {
    width: wMatch ? parseInt(wMatch[1], 10) : 0,
    height: hMatch ? parseInt(hMatch[1], 10) : 0,
    sMaskId: sMaskMatch ? parseInt(sMaskMatch[1], 10) : null,
    data: decomp
  };
}

const outDir = path.join(__dirname, '../public/clients');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const clientDefs = [
  { id: 109, name: 'amazon', slug: 'amazon' },
  { id: 110, name: 'Laxmi Infobahn', slug: 'laxmi-infobahn' },
  { id: 111, name: 'Clininvent', slug: 'clininvent' },
  { id: 113, name: 'Swan', slug: 'swan' },
  { id: 114, name: 'Jampana Infra', slug: 'jampana' },
  { id: 115, name: 'AnaCipher', slug: 'anacipher' },
  { id: 116, name: 'NMIMS University', slug: 'nmims' },
  { id: 117, name: 'Honour', slug: 'honour' },
  { id: 118, name: 'TSRTC', slug: 'tsrtc' }
];

clientDefs.forEach(client => {
  const obj = getObjectStream(client.id);
  if (!obj || !obj.width || !obj.height) return;
  
  let maskData = null;
  if (obj.sMaskId) {
    const maskObj = getObjectStream(obj.sMaskId);
    if (maskObj) maskData = maskObj.data;
  }
  
  const rgba = Buffer.alloc(obj.width * obj.height * 4);
  const isRGB = obj.data.length >= obj.width * obj.height * 3;
  
  for (let i = 0; i < obj.width * obj.height; i++) {
    const r = isRGB ? obj.data[i * 3] : obj.data[i];
    const g = isRGB ? obj.data[i * 3 + 1] : obj.data[i];
    const b = isRGB ? obj.data[i * 3 + 2] : obj.data[i];
    
    let a = 255;
    if (maskData) {
      a = maskData[i];
    } else {
      // Transparency for logos with white backgrounds (Amazon, Jampana)
      if (r > 240 && g > 240 && b > 240) {
        a = 0;
      } else if (r > 220 && g > 220 && b > 220) {
        // Soft anti-aliased edge
        const brightness = (r + g + b) / 3;
        a = Math.max(0, Math.min(255, Math.round(255 * (240 - brightness) / 20)));
      }
    }
    
    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;
    rgba[i * 4 + 3] = a;
  }
  
  const pngBuf = createPng(obj.width, obj.height, rgba);
  const outPath = path.join(outDir, `${client.slug}.png`);
  fs.writeFileSync(outPath, pngBuf);
  console.log(`Saved ${client.name} -> ${outPath}`);
});
