import "./globals.css";
import type { Metadata } from "next";
import AppNavbar from "@/components/AppNavbar";
import LegacyScripts from "@/components/LegacyScripts";
import CustomCursor from "@/components/ui/custom-cursor";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer"
import ScrollAnimations from "@/components/ScrollAnimations";
import FirefoxErrorSuppressor from "@/components/FirefoxErrorSuppressor";

export const metadata: Metadata = {
  title: "Floofy",
  description:
    "Connecting verified shelters, NGOs, and loving families through transparent, responsible pet adoption.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden">
        {/* CRITICAL: Must be first thing in body - inline to execute immediately */}
        <script dangerouslySetInnerHTML={{ __html: `
// Execute immediately, before ANY other code
(function() {
  // Create the stub object with all required properties
  var createStub = function() {
    var stub = {
      reader: {},
      _reader: {},
      init: function() { return this; },
      isAvailable: function() { return false; }
    };
    
    // Use Proxy to catch ANY property access
    try {
      return new Proxy(stub, {
        get: function(target, prop) {
          if (prop in target) return target[prop];
          if (prop === 'reader' || prop === '_reader') return {};
          if (typeof prop === 'string') return function() {};
          return undefined;
        },
        set: function(target, prop, value) {
          target[prop] = value;
          return true;
        },
        has: function() { return true; }
      });
    } catch(e) {
      // Fallback if Proxy not supported
      return stub;
    }
  };
  
  var stub = createStub();
  
  // Method 1: Define on window using Object.defineProperty (cannot be deleted)
  try {
    Object.defineProperty(window, '__firefox__', {
      value: stub,
      writable: true,
      configurable: true,
      enumerable: false
    });
    Object.defineProperty(window, '_firefox_', {
      value: stub,
      writable: true,
      configurable: true,
      enumerable: false
    });
    Object.defineProperty(window, '_firefox', {
      value: stub,
      writable: true,
      configurable: true,
      enumerable: false
    });
  } catch(e) {
    // Fallback to direct assignment
    window.__firefox__ = stub;
    window._firefox_ = stub;
    window._firefox = stub;
  }
  
  // Method 2: Define on globalThis
  try {
    if (typeof globalThis !== 'undefined') {
      globalThis.__firefox__ = stub;
      globalThis._firefox_ = stub;
      globalThis._firefox = stub;
    }
  } catch(e) {}
  
  // Method 3: Define on self
  try {
    if (typeof self !== 'undefined') {
      self.__firefox__ = stub;
      self._firefox_ = stub;
      self._firefox = stub;
    }
  } catch(e) {}
  
  // Method 4: Create as actual global variables (CRITICAL)
  // This is needed for bare variable access like: _firefox_.reader (not window._firefox_.reader)
  try {
    // Use indirect eval to execute in global scope
    (1, eval)('this').__firefox__ = stub;
    (1, eval)('this')._firefox_ = stub;
    (1, eval)('this')._firefox = stub;
  } catch(e) {}
  
  // Method 5: Use Function constructor in global context
  try {
    (new Function('stub', 'this.__firefox__ = this._firefox_ = this._firefox = stub;')).call(
      (function() { return this; })() || window,
      stub
    );
  } catch(e) {}
  
  // Ethereum stub
  try {
    if (!window.ethereum) {
      Object.defineProperty(window, 'ethereum', {
        value: { selectedAddress: undefined, isMetaMask: false },
        writable: true,
        configurable: true
      });
    } else if (!('selectedAddress' in window.ethereum)) {
      window.ethereum.selectedAddress = undefined;
    }
  } catch(e) {
    if (!window.ethereum) {
      window.ethereum = { selectedAddress: undefined };
    }
  }
})();
        ` }} />

        {/* Background (always behind) */}
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(255,247,237)"
          gradientBackgroundEnd="rgb(254,243,230)"
          firstColor="244,162,89"
          secondColor="251,191,120"
          thirdColor="249,168,94"
          fourthColor="252,147,75"
          fifthColor="255,200,145"
          interactive={false}
        />

        {/* Cursor */}
        <CustomCursor />

        {/* App content */}
        <div className="relative z-10">
          <FirefoxErrorSuppressor />
          <AppNavbar />
          {children}
          <StackedCircularFooter />
        </div>
        
        <ScrollAnimations />
        <LegacyScripts />
      </body>
    </html>
  );
}