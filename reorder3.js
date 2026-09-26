const fs = require('fs');

const content = fs.readFileSync('src/app/(public)/page.tsx', 'utf8');

const startIdx = content.indexOf('      {/* 2. Trending Packages */}');
const endIdx = content.indexOf('    </>\n  );\n}');

const prefix = content.substring(0, startIdx);
let rest = content.substring(startIdx, endIdx);
const suffix = content.substring(endIdx);

const blockTitles = [
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
blocks[currentTitle] = currentBlock;

// Desired Order (excluding Hero and Promo which we will inject into prefix):
// 2. Packages
// 3. Devotional (7. Top Destinations)
// 4. Vehicle (4. Fleet)
// 5. Resorts (6. Hotels)
// 6. Nearby East (Hill Stations)
// 7. Vizag Sight Places (8. Places to Visit)
// 8. Travel Guide (9. Guides)
// 9. Events (10. Events)
// 10. What we offer (5. What We Offer)
// 11. Gold standard
// 12. Comparison
// (Trusted Partners goes here)
// 15. FAQ (NEW: FAQ Section)
// 16. Testimonials

const desiredOrder = [
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
console.log("Successfully reordered!");
