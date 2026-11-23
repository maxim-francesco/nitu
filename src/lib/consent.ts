/**
 * Consent state for Nițu Auto Park.
 *
 * Schema is versioned: any change to the categories or their meaning must bump
 * CONSENT_VERSION, which forces the banner to reappear and re-collect a decision.
 * A stored value from an older schema is never treated as marketing consent.
 */

export const CONSENT_VERSION = 2;
export const CONSENT_KEY = "nitu_consent_v2";
/** Previous banner key: it only stored "true" (no categories). It is NOT valid marketing consent. */
export const LEGACY_CONSENT_KEY = "nitu_auto_cookie_consent";
export const OPEN_CONSENT_EVENT = "nitu:open-consent";
export const CONSENT_CHANGED_EVENT = "nitu:consent-changed";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentRecord = ConsentCategories & {
  v: number;
  ts: string;
};

const isBool = (v: unknown): v is boolean => typeof v === "boolean";

/** Strict parser: returns null for anything that is not a complete, current-schema record. */
export function parseConsent(raw: string | null | undefined): ConsentRecord | null {
  if (!raw) return null;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const rec = data as Record<string, unknown>;
  if (rec.v !== CONSENT_VERSION) return null;
  if (typeof rec.ts !== "string" || Number.isNaN(Date.parse(rec.ts))) return null;
  if (rec.necessary !== true) return null;
  if (!isBool(rec.analytics) || !isBool(rec.marketing)) return null;
  return {
    v: CONSENT_VERSION,
    ts: rec.ts,
    necessary: true,
    analytics: rec.analytics,
    marketing: rec.marketing,
  };
}

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY));
  } catch {
    return null;
  }
}

/** A banner is required when there is no decision or the decision is from an older schema. */
export function consentNeeded(record: ConsentRecord | null = readConsent()): boolean {
  return record === null;
}

export function saveConsent(categories: Pick<ConsentCategories, "analytics" | "marketing">): ConsentRecord {
  const record: ConsentRecord = {
    v: CONSENT_VERSION,
    ts: new Date().toISOString(),
    necessary: true,
    analytics: categories.analytics,
    marketing: categories.marketing,
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    // The legacy flag is not a valid basis for anything; remove it once a real decision exists.
    window.localStorage.removeItem(LEGACY_CONSENT_KEY);
  } catch {
    /* storage can be unavailable (private mode); the UI still reflects the decision for this page view */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: record }));
  return record;
}

export function clearConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
}

export function hasAnalyticsConsent(record: ConsentRecord | null = readConsent()): boolean {
  return record?.analytics === true;
}

export function hasMarketingConsent(record: ConsentRecord | null = readConsent()): boolean {
  return record?.marketing === true;
}

/** Opens the consent UI from anywhere (footer "Setări cookies"). */
export function openConsentSettings(): void {
  window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT));
}

/** Does a legacy stored value exist? Used only for reporting/cleanup, never as consent. */
export function hasLegacyConsent(): boolean {
  try {
    return window.localStorage.getItem(LEGACY_CONSENT_KEY) !== null;
  } catch {
    return false;
  }
}
