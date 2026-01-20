export function ContactSkeleton() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Industries Section Skeleton */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="h-12 md:h-16 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-3/4 mx-auto animate-pulse" />
              <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-1/2 mx-auto animate-pulse" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="neon-card p-5 rounded-lg h-16 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 animate-pulse" />
              ))}
            </div>
          </div>

          {/* Contact Info Skeleton */}
          <div className="neon-card-rotating p-12 rounded-lg space-y-10">
            <div className="text-center space-y-4">
              <div className="h-10 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-1/2 mx-auto animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-full animate-pulse" />
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-2/3 mx-auto animate-pulse" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-20 mx-auto animate-pulse" />
                    <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-24 mx-auto animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-40 animate-pulse" />
              <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-40 animate-pulse" />
            </div>
          </div>

          {/* Footer Skeleton */}
          <div className="text-center pt-8 border-t border-border">
            <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg w-2/3 mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
