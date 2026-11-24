export default function Loading() {
  return (
    <div className="container-max px-4 py-10 sm:px-6 lg:px-8" aria-busy="true" aria-live="polite">
      <div className="mx-auto h-8 w-2/3 max-w-xl animate-pulse rounded-full bg-ocean/10" />
      <div className="mx-auto mt-4 h-4 w-1/2 max-w-md animate-pulse rounded-full bg-ocean/10" />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="overflow-hidden rounded-[28px] bg-white shadow-card">
            <div className="aspect-[4/3] animate-pulse bg-sand" />
            <div className="space-y-3 p-6">
              <div className="h-5 w-3/4 animate-pulse rounded-full bg-ocean/10" />
              <div className="h-4 w-1/2 animate-pulse rounded-full bg-ocean/10" />
              <div className="h-10 w-full animate-pulse rounded-full bg-ocean/10" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
