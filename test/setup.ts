import type { SpyInstance } from 'vitest'
import { vi } from 'vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// does not compile when spying on Storage (spy inferred as never)
vi.spyOn(window.localStorage, 'getItem').mockReturnValue(null)
vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

// whereas it properly compiles on an object
const storage = {
  getItem(_key: string): string | null { return null },
}
vi.spyOn(storage, 'getItem').mockReturnValue(null);

// workaround: explicit cast
(vi.spyOn(Storage.prototype, 'getItem') as SpyInstance<Array<string>, string | null>).mockReturnValue(null)

vi.spyOn(window.localStorage, 'getItem').mockReturnValue(null)
vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

vi.spyOn(window.localStorage, 'setItem').mockReturnValue()
vi.spyOn(Storage.prototype, 'setItem').mockReturnValue()
