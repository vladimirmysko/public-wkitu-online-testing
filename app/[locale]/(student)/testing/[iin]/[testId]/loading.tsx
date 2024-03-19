export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-stretch">
      <div className="h-16 border-b border-neutral-950/10 bg-white px-4">
        <div className="container mx-auto flex h-full flex-row items-center justify-between gap-4">
          <div className="h-6 w-28 animate-pulse rounded bg-neutral-200"></div>
          <div className="h-6 w-28 animate-pulse rounded bg-neutral-200"></div>
        </div>
      </div>
      <div className="flex flex-1 flex-row px-4 py-6">
        <div className="container mx-auto flex flex-col items-stretch gap-6">
          <div className="h-64 animate-pulse rounded-lg bg-neutral-200"></div>
          <div className="h-64 animate-pulse rounded-lg bg-neutral-200"></div>
        </div>
      </div>
    </div>
  )
}
