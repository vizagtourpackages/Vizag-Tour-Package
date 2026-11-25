const fs = require('fs');
let s, crlf, currentFile = '';
function load(p) { currentFile = p; s = fs.readFileSync(p, 'utf8'); crlf = s.includes('\r\n'); s = s.replace(/\r\n/g, '\n'); }
function save(p) { fs.writeFileSync(p, crlf ? s.replace(/\n/g, '\r\n') : s); }
function rep(a, b, all) { if (!s.includes(a)) throw new Error('missing in ' + currentFile + ': ' + a.slice(0, 90)); s = all ? s.split(a).join(b) : s.replace(a, b); }
function edit(p, fn) { load(p); fn(); save(p); }

// ---------- Buttons: one consistent, well-fitted system ----------
edit('src/app/globals.css', () => {
  const sizing = 'inline-flex items-center justify-center gap-2 min-h-[3rem] px-6 py-3 sm:px-8 text-[0.95rem] font-semibold leading-tight text-center max-w-full rounded-full';
  rep('.btn-primary {\n  @apply inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-ocean text-white font-semibold rounded-full', `.btn-primary {\n  @apply ${sizing} bg-ocean text-white`);
  rep('.btn-secondary {\n  @apply inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-ocean/10 text-ocean font-semibold rounded-full', `.btn-secondary {\n  @apply ${sizing} border-2 border-ocean/15 text-ocean`);
  rep('.btn-coral {\n  @apply inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white font-semibold rounded-full', `.btn-coral {\n  @apply ${sizing} text-white`);
  rep('.btn-whatsapp {\n  @apply inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal text-white font-semibold rounded-full', `.btn-whatsapp {\n  @apply ${sizing} bg-teal text-white`);
  s += `
/* ---------- iPhone / iOS Safari hardening ---------- */
html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}
a, button, summary, label, select { touch-action: manipulation; }
/* 16px minimum on form controls stops Safari zooming the page when a field is focused */
@media (max-width: 1023px) {
  input:not([type="checkbox"]):not([type="radio"]):not([type="range"]),
  select,
  textarea { font-size: 16px !important; }
}
/* iOS renders date inputs with odd intrinsic widths; make them behave like text fields */
input[type="date"], input[type="time"] {
  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 3rem;
  text-align: left;
  background-color: #fff;
}
input[type="date"]::-webkit-date-and-time-value { text-align: left; min-height: 1.4em; }
/* Keep fixed bars out from under the notch / home indicator */
.safe-top { padding-top: env(safe-area-inset-top); }
`;
});

// ---------- Home buttons: default size + correct Araku link ----------
edit('src/app/(public)/page.tsx', () => {
  rep('className="btn-secondary !px-6 !py-2.5 !text-sm"', 'className="btn-secondary"', true);
  rep('href="/tour-packages/araku-valley"', 'href="/araku-valley"');
});

// ---------- Itinerary / attractions "view more" controls ----------
edit('src/components/PackageTabs.tsx', () => {
  rep('className="text-sm font-bold text-coral hover:text-coral/80 transition-colors mt-2 underline underline-offset-4"', 'className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-coral/10 px-4 py-2.5 text-sm font-semibold text-coral transition-colors hover:bg-coral/15 active:scale-[0.97]"');
  rep('className="w-full py-4 bg-gray-50 border border-gray-200 rounded-xl text-charcoal font-bold hover:bg-gray-100 transition-colors"', 'className="w-full rounded-full border border-ocean/15 bg-white py-3.5 text-[0.95rem] font-semibold text-ocean transition-colors hover:bg-sand active:scale-[0.99]"');
});
edit('src/app/(public)/resorts/[slug]/page.tsx', () => {
  rep('className="list-none cursor-pointer flex justify-center py-3 text-[#2D6A4F] font-bold text-sm hover:underline border-t border-[#E8DDD4]/50 mt-1"', 'className="mt-3 flex cursor-pointer list-none items-center justify-center rounded-full bg-coral/10 py-3 text-sm font-semibold text-coral transition-colors hover:bg-coral/15"', true);
});

// ---------- Package page CTAs ----------
edit('src/components/booking/CustomEnquiryButton.tsx', () => {
  rep('className="w-full py-2.5 lg:py-4 rounded-full border-2 border-amber-500 text-amber-600 font-bold text-xs lg:text-base hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"', 'className="flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full border-2 border-coral/40 px-5 py-3 text-[0.95rem] font-semibold text-coral transition-[background-color,transform] duration-150 hover:bg-coral/5 active:scale-[0.98]"');
  rep('<MessageCircle size={16} className="lg:w-[18px] lg:h-[18px]" />', '<MessageCircle size={18} />');
});
edit('src/components/PackageBookingButton.tsx', () => {
  rep(`      className={plan
        ? "inline-block w-full sm:w-auto px-8 py-3 text-sm font-bold text-center text-teal border-2 border-teal rounded-lg hover:bg-teal hover:text-white transition-colors"
        : "w-full flex items-center justify-center gap-2 text-white bg-teal py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-sm lg:shadow-md hover:bg-teal-dark hover:shadow-lg transition-all"
      }`, `      className={plan ? "btn-secondary w-full sm:w-auto" : "btn-coral w-full !py-4 text-base"}`);
  rep("{plan ? 'SELECT' : 'Book Now'}", "{plan ? 'Select' : 'Book now'}");
});

// ---------- 16px controls on custom inputs ----------
edit('src/components/HeroSection.tsx', () => {
  rep('text-[0.95rem] font-semibold text-ocean outline-none', 'text-base font-semibold text-ocean outline-none', true);
});
edit('src/components/MobileBottomNav.tsx', () => {
  rep('text-[0.95rem] text-ocean outline-none placeholder:text-ocean/35', 'text-base text-ocean outline-none placeholder:text-ocean/35');
});

// ---------- Header: respect the iPhone notch / dynamic island in landscape & standalone ----------
edit('src/components/Navbar.tsx', () => {
  rep('className={`fixed inset-x-0 top-0 z-[100] border-b bg-white transition-[box-shadow,border-color] duration-300 ${', 'className={`safe-top fixed inset-x-0 top-0 z-[100] border-b bg-white transition-[box-shadow,border-color] duration-300 ${');
});
edit('src/app/(public)/layout.tsx', () => {
  rep('<main className="flex-1 pt-[72px] overflow-x-clip">', '<main className="flex-1 pt-[calc(72px+env(safe-area-inset-top))] overflow-x-clip">');
});

// ---------- dvh for sheets so iOS toolbars never cover content ----------
edit('src/components/MobileBottomNav.tsx', () => {
  rep('max-h-[88vh] overflow-y-auto rounded-t-[28px] bg-warm-white', 'max-h-[88vh] [max-height:88dvh] overflow-y-auto rounded-t-[28px] bg-warm-white');
});
edit('src/components/EnquirySidebar.tsx', () => {
  rep('max-h-[calc(100vh-14rem)]', 'max-h-[calc(100vh-14rem)] [max-height:calc(100dvh-14rem)]');
});
edit('src/components/booking/StayPicker.tsx', () => { /* list now scrolls with the modal body */ });
console.log('ok');
