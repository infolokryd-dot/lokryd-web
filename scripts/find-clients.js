const fs = require('fs');
const readline = require('readline');

async function findMentions() {
  const fileStream = fs.createReadStream('C:/Users/shiva/.gemini/antigravity-ide/brain/8ca48761-4455-4dc9-bf99-6d870e1a699e/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.source === 'USER_EXPLICIT' && obj.content) {
        const matches = obj.content.match(/.{0,50}(?:client|logo|marquee|partner|reference).{0,50}/gi);
        if (matches && matches.length > 0) {
          console.log(`Step ${obj.step_index}:`, matches.slice(0, 5));
        }
      }
    } catch {}
  }
}

findMentions();
