import { bsSharedConfig } from './wdio.bs.shared.conf';
import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
  ...bsSharedConfig,
  specs: [
    './tests/login.spec.ts',
    './tests/products.spec.ts',
    './tests/cart.spec.ts',
  ],
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'bs://0981c27887624ef131529d3eacb246478357742c',
    'appium:deviceName': 'Samsung Galaxy S23',
    'appium:platformVersion': '13.0',
    'appium:newCommandTimeout': 300,
    'appium:appWaitActivity': 'com.saucelabs.mydemoapp.rn.MainActivity',
    'appium:appWaitDuration': 30000,
    'appium:androidInstallTimeout': 60000,
    'appium:autoGrantPermissions': true,
    'appium:noSign': true,
    'bstack:options': {
      userName: 'nimanthafernando_KEBjV4',
      accessKey: 'sfvzyyzNLZSxnPr64NCh',
      projectName: 'mobile-tests-clean',
      buildName: 'Android - Build 21',
      sessionName: 'TC-NEW-01 to TC-NEW-09',
      networkLogs: true,
      consoleLogs: 'info',
      deviceLogs: true,
      appiumVersion: '2.0.0',
    },
  }],
};
