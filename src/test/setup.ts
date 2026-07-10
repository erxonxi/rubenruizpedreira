import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

Object.defineProperty(Element.prototype, "scrollIntoView", {
  writable: true,
  value: () => undefined,
});

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  writable: true,
  value: () => undefined,
});

Object.defineProperty(window, "requestAnimationFrame", {
  writable: true,
  value: (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  },
});

Object.defineProperty(window, "cancelAnimationFrame", {
  writable: true,
  value: () => undefined,
});
