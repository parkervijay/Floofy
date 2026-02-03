'use client';

export function FloofyLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cloud cloud1" />
        <div className="cloud cloud2" />
        <div className="cloud cloud3" />
        <div className="cloud cloud4" />
        <div className="cloud cloud5" />
      </div>

      {/* Rocket / Paw */}
      <div className="loader">
        <span>
          <span />
          <span />
          <span />
          <span />
        </span>

        <div className="base">
          <span />
          <div className="face" />
        </div>
      </div>

      {/* Speed lines */}
      <div className="longfazers">
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Text */}
      <div className="absolute bottom-20 text-center">
        <p className="text-lg font-semibold text-[#F4A259] tracking-wide">
          Floofy is getting ready 🐾
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Finding loving homes...
        </p>
      </div>
    </div>
  );
}
