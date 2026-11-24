/**
 * TikTok Pixel loader for Nițu Auto Park.
 *
 * The pixel is never part of index.html. It is injected only after an explicit
 * marketing consent and it is not re-injected after a withdrawal.
 */

export const TIKTOK_PIXEL_ID = "D9H6IR3C77U0DKSMFMPG";
const SCRIPT_ID = "tiktok-pixel-sdk";

type AnyTtq = {
  methods?: string[];
  setAndDefer?: (target: AnyTtq, method: string) => void;
  load?: (id: string) => void;
  page?: () => void;
  revokeConsent?: () => void;
  disableCookie?: () => void;
  _i?: Record<string, unknown>;
  _t?: Record<string, number>;
  _o?: Record<string, unknown>;
  [key: string]: unknown;
};

let loaded = false;

/** Official TikTok Pixel bootstrap, ported to TypeScript (queue + load). */
function bootstrap(): AnyTtq {
  const w = window as unknown as { ttq?: AnyTtq; TiktokAnalyticsObject?: string };
  w.TiktokAnalyticsObject = "ttq";
  const ttq = (w.ttq = (w.ttq || []) as unknown as AnyTtq);
  ttq.methods = [
    "page", "track", "identify", "instances", "debug", "on", "off", "once",
    "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent",
    "revokeConsent", "grantConsent",
  ];
  ttq.setAndDefer = function (target, method) {
    target[method] = function (...args: unknown[]) {
      (target as unknown as { push: (v: unknown) => void }).push([method, ...args]);
    };
  };
  for (const method of ttq.methods) ttq.setAndDefer(ttq, method);
  ttq.load = function (id) {
    const url = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = ttq._i || {};
    ttq._i[id] = [];
    ttq._t = ttq._t || {};
    ttq._t[id] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[id] = {};
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "text/javascript";
    script.async = true;
    script.src = `${url}?sdkid=${id}&lib=ttq`;
    const first = document.getElementsByTagName("script")[0];
    if (first?.parentNode) first.parentNode.insertBefore(script, first);
    else document.head.appendChild(script);
  };
  return ttq;
}

/** Loads the TikTok SDK once. Callers must have already verified marketing consent. */
export function loadTikTokPixel(): void {
  if (typeof window === "undefined" || loaded) return;
  if (document.getElementById(SCRIPT_ID)) {
    loaded = true;
    return;
  }
  const ttq = bootstrap();
  ttq.load?.(TIKTOK_PIXEL_ID);
  ttq.page?.();
  loaded = true;
}

function expireCookie(name: string): void {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`];
  for (const domain of domains) {
    document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
      domain ? `; domain=${domain}` : ""
    }`;
  }
}

/**
 * Removes the first-party TikTok cookies this site can reach and asks the SDK to
 * revoke consent. It cannot delete the third-party `_ttp` cookie set on
 * .tiktok.com, nor data already sent to TikTok — see the report limitations.
 */
export function revokeTikTok(): void {
  const w = window as unknown as { ttq?: AnyTtq };
  try {
    if (typeof w.ttq?.revokeConsent === "function") w.ttq.revokeConsent();
    if (typeof w.ttq?.disableCookie === "function") w.ttq.disableCookie();
  } catch {
    /* the SDK may not expose the method; cookie cleanup below still runs */
  }
  const names = ["_ttp", "_tt_enable_cookie", "ttcsid", `ttcsid_${TIKTOK_PIXEL_ID}`];
  names.forEach(expireCookie);
  // After withdrawal the pixel must not be called again from this page.
  document.getElementById(SCRIPT_ID)?.remove();
  try {
    w.ttq = undefined;
  } catch {
    /* ignore */
  }
  loaded = false;
}

export function isTikTokLoaded(): boolean {
  return loaded || document.getElementById(SCRIPT_ID) !== null;
}
