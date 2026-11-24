import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-theme flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="kicker mb-4">Error 404</p>
      <h1 className="font-heading text-[clamp(2.4rem,7vw,4.5rem)] leading-[1.05] text-ocean">
        This road leads <span className="italic text-coral">nowhere</span>
      </h1>
      <p className="mt-5 max-w-md text-charcoal/65">The page you are looking for has moved or does not exist. Let&apos;s get you back on the route.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-coral">Back to home</Link>
        <Link href="/tour-packages" className="btn-secondary">Browse packages</Link>
      </div>
    </main>
  );
}
