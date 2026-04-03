export default function Header() {
  return (
    <header className="border-b border-border w-full bg-surface fixed top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm">
            📱
          </div>

          <h1 className="text-base sm:text-lg font-semibold text-text-heading">
            BundleHub
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block text-sm text-text">Admin</div>

          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}