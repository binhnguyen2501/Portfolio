import { useEffect, useMemo } from "react";

// Pages already shown since the app loaded. It lives in memory only, so a
// reload or a fresh visit plays the entrance animations again.
const seen = new Set<string>();

/**
 * True the first time the page with this key is shown in the current session,
 * false on every later visit (navigating away and back).
 *
 * Pages use it to play their entrance animations once: the first visit gets
 * the full intro and scroll reveals, later visits show the content straight
 * away so moving between pages feels instant.
 */
export const useFirstVisit = (key: string) => {
  const first = useMemo(() => !seen.has(key), [key]);

  useEffect(() => {
    seen.add(key);
  }, [key]);

  return first;
};
