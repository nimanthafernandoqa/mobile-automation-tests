export async function resetApp(): Promise<void> {
  await browser.pause(2000);

  // Cold-restart clears React Navigation stack
  try {
    await (browser as any).terminateApp('com.saucelabs.mydemoapp.rn');
  } catch (_e) {}
  await browser.pause(2000);
  await (browser as any).activateApp('com.saucelabs.mydemoapp.rn');

  // Wait up to 20 s for a known screen
  for (let i = 0; i < 20; i++) {
    await browser.pause(1000);
    const src = await browser.getPageSource();

    if (src.includes('Username input field')) {
      console.log('[resetApp] Already on Login screen — done');
      return;
    }

    if (
      src.includes('Sauce Labs Backpack') ||
      src.includes('products screen')
    ) {
      // Cached login — need to log out
      console.log('[resetApp] On Products screen, opening menu to log out');
      await $('~open menu').click();
      await browser.pause(2000);
      await $('~menu item log out').click();
      console.log('[resetApp] Tapped menu log-out item, waiting for dialog or Login');

      // Now poll: confirm dialog if it appears, return if Login appears
      for (let j = 0; j < 60; j++) {
        await browser.pause(500);
        const s = await browser.getPageSource();

        if (s.includes('Username input field')) {
          console.log('[resetApp] Login screen appeared — done');
          return;
        }

        // Logout confirmation dialog: button1 = "LOG OUT" (positive action)
        if (s.includes('android:id/button1')) {
          console.log('[resetApp] Tapping logout confirmation dialog (button1)');
          try {
            await $('//*[@resource-id="android:id/button1"]').click();
          } catch (_e) {
            console.log('[resetApp] button1 click failed, trying text-based');
            try { await $('//*[@text="LOG OUT"]').click(); } catch (_e2) {}
          }
          await browser.pause(1500);
          continue;
        }

        // Still on products even after log-out click — re-try every 10 s
        if (
          j > 0 && j % 20 === 0 &&
          (s.includes('products screen') || s.includes('Sauce Labs Backpack'))
        ) {
          console.log('[resetApp] Still on Products after wait, re-trying menu');
          try {
            await $('~open menu').click();
            await browser.pause(1500);
            await $('~menu item log out').click();
            await browser.pause(1500);
          } catch (_e) {}
        }
      }

      throw new Error('[resetApp] Login screen did not appear after log out (60-tick poll)');
    }
  }

  throw new Error('[resetApp] App did not reach a known screen within 20 s');
}

export async function clearCart(): Promise<void> {
  try {
    await $('~cart badge').waitForDisplayed({ timeout: 3000 });
  } catch (_e) {
    return;
  }

  await $('~cart badge').click();
  await $('~cart screen').waitForDisplayed({ timeout: 15000 });
  await browser.pause(2000);

  for (let i = 0; i < 10; i++) {
    try {
      await $('~remove item').waitForDisplayed({ timeout: 3000 });
    } catch (_e) {
      break;
    }
    await $('~remove item').click();
    await browser.pause(1500);
  }

  try {
    await $('//*[@text="Continue Shopping"]').click();
  } catch (_e) {
    await (browser as any).back();
  }
  await $('~products screen').waitForDisplayed({ timeout: 15000 });
}
