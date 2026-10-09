const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/shiva/.gemini/antigravity-ide/brain';
const convDirs = fs.readdirSync(brainDir);

convDirs.forEach(conv => {
  const full = path.join(brainDir, conv);
  if (fs.statSync(full).isDirectory()) {
    ['.user_uploaded', '.tempmediaStorage'].forEach(sub => {
      const subPath = path.join(full, sub);
      if (fs.existsSync(subPath)) {
        const files = fs.readdirSync(subPath);
        files.forEach(f => {
          const fPath = path.join(subPath, f);
          const stat = fs.statSync(fPath);
          console.log(`${conv}/${sub}/${f} (${stat.size} bytes, ${stat.mtime.toISOString()})`);
        });
      }
    });
  }
});
