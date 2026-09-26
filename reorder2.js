const fs = require('fs');
const content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

const prefix = content.split('{/* 1. Home/Hero section */}')[0];
let rest = '{/* 1. Home/Hero section */}' + content.split('{/* 1. Home/Hero section */}')[1];

const suffixStr = '    </>\n  );\n}';
const suffix = suffixStr + rest.split(suffixStr)[1];
rest = rest.split(suffixStr)[0];

const blockTitles = [
  '1. Home/Hero section',
  'NEW: Promotional Banner',
  '2. Trending Packages',
  '4. Our Premium Fleet',
  'NEW: Gold Standard',
  'NEW: Comparison Table',
  '5. What We Offer',
  '6. Hotels & Resorts',
  '7. Top Destinations from Vizag',
  '8. Places to Visit in Vizag',
  'NEW: Hill Station Destinations',
  '9. Travel Guides',
  '10. Upcoming Events',
  'Your Trusted Travel Partner (Redesigned)',
  'NEW: FAQ Section',
  '11. Customer Reviews'
];

let blocks = {};
let currentTitle = blockTitles[0];
let currentBlock = '';

const lines = rest.split('\n');
for (let line of lines) {
  let isNewTitle = false;
  for (let title of blockTitles) {
    if (line.includes(`{/* ${title} */}`)) {
      if (currentTitle) {
        blocks[currentTitle] = currentBlock;
      }
      currentTitle = title;
      currentBlock = line + '\n';
      isNewTitle = true;
      break;
    }
  }
  if (!isNewTitle) {
    currentBlock += line + '\n';
  }
}
blocks[currentTitle] = currentBlock; // last block

const desiredOrder = [
  '1. Home/Hero section',
  'NEW: Promotional Banner',
  '2. Trending Packages',
  '7. Top Destinations from Vizag',
  '4. Our Premium Fleet',
  '6. Hotels & Resorts',
  'NEW: Hill Station Destinations',
  '8. Places to Visit in Vizag',
  '9. Travel Guides',
  '10. Upcoming Events',
  '5. What We Offer',
  'NEW: Gold Standard',
  'NEW: Comparison Table',
  'Your Trusted Travel Partner (Redesigned)',
  'NEW: FAQ Section',
  '11. Customer Reviews'
];

let newBody = '';
for (let title of desiredOrder) {
  if (blocks[title]) {
    newBody += blocks[title];
  } else {
    console.error("Missing block: " + title);
  }
}

fs.writeFileSync('src/app/(public)/page.tsx', prefix + newBody + suffix);
console.log("Successfully reordered via AST-like parsing.");
