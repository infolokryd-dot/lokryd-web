const fs = require('fs');
const readline = require('readline');

async function getStep(stepNum) {
  const fileStream = fs.createReadStream('C:/Users/shiva/.gemini/antigravity-ide/brain/8ca48761-4455-4dc9-bf99-6d870e1a699e/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.step_index === stepNum) {
        console.log("Found step", stepNum);
        console.log(obj.content);
        break;
      }
    } catch {}
  }
}

getStep(443);
