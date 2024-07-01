import { useCallback, useState } from "react";
import Cookie from "js-cookie";

export default function useCookie(
  cookieName: string
): [
  string | null,
  (newCookie: string, options?: Cookie.CookieAttributes) => void,
  () => void,
] {
  const [cookie, setCookie] = useState<string | null>(
    Cookie.get(cookieName) || null
  );

  const updateCookie = useCallback(
    (newCookie: string, options?: Cookie.CookieAttributes) => {
      Cookie.set(cookieName, newCookie, options);
      setCookie(newCookie);
    },
    [cookieName]
  );

  const deleteCookie = useCallback(() => {
    Cookie.remove(cookieName);
    setCookie(null);
  }, [cookieName]);

  return [cookie, updateCookie, deleteCookie];
}
