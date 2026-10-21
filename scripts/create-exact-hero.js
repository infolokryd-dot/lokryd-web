const sharp = require('sharp');

async function createHeroImage() {
  const userPath = 'C:\\Users\\shiva\\.gemini\\antigravity-ide\\brain\\c4f27739-b886-4c69-a631-f71abd1f437f\\.user_uploaded\\media_1792476133639.jpg';
  const cleanPath = 'C:\\Users\\shiva\\.gemini\\antigravity-ide\\brain\\c4f27739-b886-4c69-a631-f71abd1f437f\\city_motion_clean_1792477536434.jpg';
  const outPath = 'D:\\PROJECTS\\lokryd_web\\public\\images\\city-motion-exact.jpg';

  // Resize clean to match user image 1024x576 exactly
  const cleanResized = await sharp(cleanPath)
    .resize(1024, 576, { fit: 'fill' })
    .toBuffer();

  const userBuf = await sharp(userPath)
    .toBuffer();

  // Wordmark LOKRYD is between y: 90 and y: 310.
  // The bottom of the skyline is around y: 325-335.
  // The headline "MOVE WITH" starts at y: 370.
  // Top navbar text is y: 0..55.
  const mask = Buffer.alloc(1024 * 576);

  for (let y = 0; y < 576; y++) {
    let alpha = 0;
    if (y < 65) {
      alpha = 0; // clean sky (no navbar text)
    } else if (y >= 65 && y < 90) {
      // smooth fade in to user image (LOKRYD wordmark in sky)
      alpha = (y - 65) / 25;
    } else if (y >= 90 && y < 315) {
      // full user image (skyline + LOKRYD architectural wordmark)
      alpha = 1;
    } else if (y >= 315 && y < 340) {
      // smooth fade out to clean image (clean road, no bottom text)
      alpha = 1 - (y - 315) / 25;
    } else {
      alpha = 0; // 100% clean road with no text
    }

    const val = Math.round(alpha * 255);
    for (let x = 0; x < 1024; x++) {
      mask[y * 1024 + x] = val;
    }
  }

  // Load raw pixels of user and clean
  const { data: userData } = await sharp(userBuf).raw().toBuffer({ resolveWithObject: true });
  const { data: cleanData } = await sharp(cleanResized).raw().toBuffer({ resolveWithObject: true });

  const blended = Buffer.alloc(1024 * 576 * 3);
  for (let i = 0; i < 1024 * 576; i++) {
    const a = mask[i] / 255;
    blended[i * 3 + 0] = Math.round(userData[i * 3 + 0] * a + cleanData[i * 3 + 0] * (1 - a));
    blended[i * 3 + 1] = Math.round(userData[i * 3 + 1] * a + cleanData[i * 3 + 1] * (1 - a));
    blended[i * 3 + 2] = Math.round(userData[i * 3 + 2] * a + cleanData[i * 3 + 2] * (1 - a));
  }

  // Save as high-quality JPEG
  await sharp(blended, {
    raw: {
      width: 1024,
      height: 576,
      channels: 3,
    },
  })
    .jpeg({ quality: 98 })
    .toFile(outPath);

  console.log('Saved perfect blended hero to:', outPath);
}

createHeroImage().catch(console.error);
