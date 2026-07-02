interface WdioElement {
  click(): Promise<void>;
  waitForDisplayed(opts?: { timeout?: number; reverse?: boolean }): Promise<boolean>;
  clearValue(): Promise<void>;
  setValue(value: string | number): Promise<void>;
  getText(): Promise<string>;
}

interface WdioActionBuilder {
  move(opts: { x?: number; y?: number; duration?: number }): WdioActionBuilder;
  down(opts?: object): WdioActionBuilder;
  up(opts?: object): WdioActionBuilder;
  perform(): Promise<void>;
}

interface WdioBrowser {
  pause(ms: number): Promise<void>;
  getPageSource(): Promise<string>;
  action(type: string, opts?: object): WdioActionBuilder;
}

interface WdioMatcher {
  toBeDisplayed(): Promise<void>;
  toContain(value: string): void;
  toBe(value: unknown): void;
  not: WdioMatcher;
}

declare function $(selector: string): WdioElement;
declare function $$(selector: string): Promise<WdioElement[]>;
declare const browser: WdioBrowser;
declare const driver: WdioBrowser;
declare function expect(actual: unknown): WdioMatcher;
