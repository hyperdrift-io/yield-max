declare module 'bun:test' {
  export function describe(name: string, fn: () => void): void;
  export function test(name: string, fn: () => void | Promise<void>): void;
  export namespace test {
    function skip(name: string, fn: () => void | Promise<void>): void;
  }
  export function expect(value: any): {
    toBe(value: any): void;
    toEqual(value: any): void;
    toBeDefined(): void;
    toBeFalsy(): void;
    toBeTruthy(): void;
    toBeNull(): void;
    toHaveBeenCalled(): void;
    toHaveBeenCalledWith(...args: any[]): void;
    toBeGreaterThan(value: number): void;
    toBeInstanceOf(constructor: Function): void;
    toHaveProperty(key: string): void;
  };
  export function beforeEach(fn: () => void | Promise<void>): void;
  export function mock<T>(fn: () => T): (() => T) & { mock: { calls: any[][] } };
  export namespace mock {
    function module(moduleName: string, factory: () => any): void;
  }
}
