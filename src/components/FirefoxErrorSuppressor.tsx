"use client";

import { useEffect } from 'react';

export default function FirefoxErrorSuppressor() {
  useEffect(() => {
    // Create Firefox stubs immediately on mount (client-side)
    const createStub = () => {
      const stub: any = {
        reader: {},
        _reader: {},
        init: () => stub,
        isAvailable: () => false
      };
      
      try {
        return new Proxy(stub, {
          get: (target, prop) => {
            if (prop in target) return target[prop];
            if (prop === 'reader' || prop === '_reader') return {};
            return () => undefined;
          },
          set: (target, prop, value) => {
            target[prop] = value;
            return true;
          }
        });
      } catch (e) {
        return stub;
      }
    };
    
    const stub = createStub();
    
    // Helper function to safely set property
    const safeSetProperty = (obj: any, prop: string, value: any) => {
      try {
        // Check if property already exists and is writable
        const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        
        if (!descriptor) {
          // Property doesn't exist, create it
          Object.defineProperty(obj, prop, {
            value: value,
            writable: true,
            configurable: true,
            enumerable: false
          });
        } else if (descriptor.writable || descriptor.set) {
          // Property exists and is writable
          obj[prop] = value;
        }
        // If property exists but is readonly, skip it (don't throw error)
      } catch (e) {
        // Silently ignore errors
      }
    };
    
    // Ensure stubs exist on all global objects (only if not already set)
    if (typeof window !== 'undefined') {
      safeSetProperty(window, '__firefox__', stub);
      safeSetProperty(window, '_firefox_', stub);
      safeSetProperty(window, '_firefox', stub);
    }
    
    if (typeof globalThis !== 'undefined') {
      safeSetProperty(globalThis, '__firefox__', stub);
      safeSetProperty(globalThis, '_firefox_', stub);
      safeSetProperty(globalThis, '_firefox', stub);
    }
    
    // Suppress console errors related to Firefox
    const originalError = console.error;
    console.error = (...args: any[]) => {
      const errorString = args.join(' ');
      
      // Suppress specific Firefox-related errors
      if (
        errorString.includes('_firefox_') ||
        errorString.includes('__firefox__') ||
        errorString.includes('firefox.reader') ||
        errorString.includes("Can't find variable: _firefox") ||
        errorString.includes("undefined is not an object (evaluating 'window._firefox") ||
        errorString.includes("Attempted to assign to readonly property")
      ) {
        // Silently ignore these errors
        return;
      }
      
      // Log all other errors normally
      originalError.apply(console, args);
    };
    
    // Global error handler
    const errorHandler = (event: ErrorEvent) => {
      const errorMessage = event.message || '';
      
      if (
        errorMessage.includes('_firefox_') ||
        errorMessage.includes('__firefox__') ||
        errorMessage.includes('firefox.reader') ||
        errorMessage.includes('readonly property')
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };
    
    window.addEventListener('error', errorHandler, true);
    
    // Cleanup
    return () => {
      console.error = originalError;
      window.removeEventListener('error', errorHandler, true);
    };
  }, []);
  
  return null;
}