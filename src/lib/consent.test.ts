import { beforeEach, describe, expect, it } from "vitest";
import {
  CONSENT_KEY,
  CONSENT_VERSION,
  LEGACY_CONSENT_KEY,
  clearConsent,
  consentNeeded,
  hasAnalyticsConsent,
  hasLegacyConsent,
  hasMarketingConsent,
  parseConsent,
  readConsent,
  saveConsent,
} from "./consent";
import { TIKTOK_PIXEL_ID, isTikTokLoaded, loadTikTokPixel, revokeTikTok } from "./tiktok";

const valid = (over: Record<string, unknown> = {}) =>
  JSON.stringify({
    v: CONSENT_VERSION,
    ts: "2026-11-23T10:00:00.000Z",
    necessary: true,
    analytics: false,
    marketing: false,
    ...over,
  });

beforeEach(() => {
  window.localStorage.clear();
  document.head.innerHTML = "";
  document.body.innerHTML = "";
});

describe("parseConsent", () => {
  it("accepts a complete current-schema record", () => {
    const record = parseConsent(valid({ marketing: true }));
    expect(record).toMatchObject({ v: CONSENT_VERSION, marketing: true, analytics: false });
  });

  it("rejects the legacy boolean flag as consent", () => {
    expect(parseConsent("true")).toBeNull();
    expect(parseConsent("false")).toBeNull();
  });

  it("rejects a record from an older schema version", () => {
    expect(parseConsent(valid({ v: CONSENT_VERSION - 1 }))).toBeNull();
  });

  it("rejects incomplete or malformed records", () => {
    expect(parseConsent(null)).toBeNull();
    expect(parseConsent("")).toBeNull();
    expect(parseConsent("{not json")).toBeNull();
    expect(parseConsent(valid({ necessary: false }))).toBeNull();
    expect(parseConsent(valid({ analytics: "yes" }))).toBeNull();
    expect(parseConsent(valid({ ts: "not-a-date" }))).toBeNull();
  });
});

describe("storage lifecycle", () => {
  it("persists a decision with version and timestamp", () => {
    const record = saveConsent({ analytics: true, marketing: false });
    const stored = JSON.parse(window.localStorage.getItem(CONSENT_KEY) as string);
    expect(stored.v).toBe(CONSENT_VERSION);
    expect(stored.necessary).toBe(true);
    expect(Number.isNaN(Date.parse(stored.ts))).toBe(false);
    expect(record.marketing).toBe(false);
  });

  it("does not treat a legacy value as marketing consent", () => {
    window.localStorage.setItem(LEGACY_CONSENT_KEY, "true");
    expect(readConsent()).toBeNull();
    expect(hasMarketingConsent()).toBe(false);
    expect(hasAnalyticsConsent()).toBe(false);
    expect(consentNeeded()).toBe(true);
    expect(hasLegacyConsent()).toBe(true);
  });

  it("removes the legacy key once a real decision is saved", () => {
    window.localStorage.setItem(LEGACY_CONSENT_KEY, "true");
    saveConsent({ analytics: false, marketing: true });
    expect(window.localStorage.getItem(LEGACY_CONSENT_KEY)).toBeNull();
    expect(hasMarketingConsent()).toBe(true);
  });

  it("clears the decision and asks for consent again", () => {
    saveConsent({ analytics: false, marketing: false });
    expect(consentNeeded()).toBe(false);
    clearConsent();
    expect(consentNeeded()).toBe(true);
  });
});

describe("TikTok loader", () => {
  it("does not inject the SDK until asked", () => {
    expect(isTikTokLoaded()).toBe(false);
    expect(document.getElementById("tiktok-pixel-sdk")).toBeNull();
  });

  it("injects the SDK once with the configured pixel id", () => {
    loadTikTokPixel();
    loadTikTokPixel();
    const scripts = document.querySelectorAll("#tiktok-pixel-sdk");
    expect(scripts).toHaveLength(1);
    expect((scripts[0] as HTMLScriptElement).src).toContain("analytics.tiktok.com");
    expect((scripts[0] as HTMLScriptElement).src).toContain(TIKTOK_PIXEL_ID);
    expect(isTikTokLoaded()).toBe(true);
  });

  it("revokes without throwing when the SDK is absent", () => {
    expect(() => revokeTikTok()).not.toThrow();
  });
});
