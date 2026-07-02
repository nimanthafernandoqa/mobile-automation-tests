import type { Options } from '@wdio/types';

export const bsSharedConfig: Partial<Options.Testrunner> = {
  runner: 'local',
  specs: ['./tests/**/*.spec.ts'],
  maxInstances: 1,
  services: [],
  hostname: 'hub-cloud.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 300_000,
  },
  reporters: ['spec'],
  connectionRetryTimeout: 300_000,
  connectionRetryCount: 3,
  before: async () => {
    await browser.pause(10000);
  },
};
