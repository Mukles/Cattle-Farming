import { useEffect, useRef } from "react";

// The deepCompare function from your code
function deepCompare(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a == null || b == null) return a === b;
  if (typeof a === "function") return a.toString() === b.toString();
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepCompare(a[i], b[i])) return false;
    }
    return true;
  }
  if (typeof a === "object") {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (let key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!deepCompare(a[key], b[key])) return false;
    }
    return true;
  }
  return a === b;
}

// Custom hook: useDeepCompare
function useDeepCompare<T>(value: T): boolean {
  const previousValueRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    previousValueRef.current = value;
  });

  const isEqual = deepCompare(previousValueRef.current, value);

  return isEqual;
}

export default useDeepCompare;
