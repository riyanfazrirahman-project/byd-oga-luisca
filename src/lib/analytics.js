export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("oga-analytics", { detail: { eventName, ...params } }));

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
