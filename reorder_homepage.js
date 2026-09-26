const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/app/(public)/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The best way to extract JSX blocks is to split the content by section comments.
// We know all sections start with `{/* ` or `<HeroSection />`, etc.
// But we can just use regex to find each section.
const sections = [
  '      {/* 1. Home/Hero section */}',
  '      {/* NEW: Promotional Banner */}',
  '      {/* 2. Trending Packages */}',
  '      {/* 4. Our Premium Fleet */}',
  '      {/* NEW: Gold Standard */}',
  '      {/* NEW: Comparison Table */}',
  '      {/* 5. What We Offer */}',
  '      {/* 6. Hotels & Resorts */}',
  '      {/* 7. Top Destinations from Vizag */}',
  '      {/* 8. Places to Visit in Vizag */}',
  '      {/* NEW: Hill Station Destinations */}',
  '      {/* 9. Travel Guides */}',
  '      {/* 10. Upcoming Events */}',
  '      {/* Your Trusted Travel Partner (Redesigned) */}',
  '      {/* NEW: FAQ Section */}',
  '      {/* 11. Customer Reviews */}'
];

let blocks = {};

for (let i = 0; i < sections.length; i++) {
  const current = sections[i];
  const next = i + 1 < sections.length ? sections[i+1] : '    </>';
  
  const startIndex = content.indexOf(current);
  const endIndex = content.indexOf(next, startIndex);
  
  if (startIndex === -1 || endIndex === -1) {
    console.error(`Could not find boundary for ${current}`);
  } else {
    blocks[i] = content.substring(startIndex, endIndex);
  }
}

const desiredOrderIndices = [
  0,  // Hero
  1,  // Promo
  2,  // Packages
  8,  // Destinations (Devotional)
  3,  // Fleet
  7,  // Hotels
  10, // Hill Stations (Nearby East)
  9,  // Places to Visit
  11, // Travel Guides
  12, // Upcoming Events
  6,  // What We Offer
  4,  // Gold Standard
  5,  // Comparison
  13, // Trusted Partner
  14, // FAQ
  15  // Testimonials
];

let newBody = '\n';
for (let idx of desiredOrderIndices) {
  newBody += blocks[idx];
}

const start = content.indexOf('      {/* 1. Home/Hero section */}');
const end = content.indexOf('    </>\n  );\n}');

const newContent = content.substring(0, start) + newBody + content.substring(end);

fs.writeFileSync(filePath, newContent);
console.log("Successfully reordered page.tsx!");
