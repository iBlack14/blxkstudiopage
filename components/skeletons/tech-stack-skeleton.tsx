export function TechStackSkeleton() {
  return (
    <section className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Skeleton */}
          <div className="text-center space-y-4">
            <div className="h-12 md:h-16 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-3/4 mx-auto animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-full animate-pulse" />
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-2/3 mx-auto animate-pulse" />
            </div>
          </div>

          {/* Categories Skeleton */}
          <div className="space-y-12">
            {[1, 2, 3, 4, 5].map((categoryIdx) => (
              <div key={categoryIdx} className="space-y-8">
                <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-1/3 mx-auto animate-pulse" />
                <div className="flex flex-wrap items-center justify-center gap-10">
                  {[1, 2, 3, 4, 5].map((techIdx) => (
                    <div key={techIdx} className="flex flex-col items-center gap-4">
                      <div className="w-18 h-18 rounded-lg bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 animate-pulse" />
                      <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-16 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
