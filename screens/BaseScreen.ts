export default class BaseScreen {
  protected el(accessibilityId: string): WdioElement {
    return $(`~${accessibilityId}`);
  }

  protected async waitForVisible(accessibilityId: string, timeout = 30_000): Promise<WdioElement> {
    const el = this.el(accessibilityId);
    await el.waitForDisplayed({ timeout });
    return el;
  }

  protected async tap(accessibilityId: string): Promise<void> {
    const el = await this.waitForVisible(accessibilityId);
    await el.click();
  }

  protected async typeInto(accessibilityId: string, text: string): Promise<void> {
    const el = await this.waitForVisible(accessibilityId);
    await el.clearValue();
    await el.setValue(text);
  }

  protected async getText(accessibilityId: string): Promise<string> {
    const el = await this.waitForVisible(accessibilityId);
    return el.getText();
  }

  protected async assertVisible(accessibilityId: string): Promise<void> {
    const el = await this.waitForVisible(accessibilityId);
    await expect(el).toBeDisplayed();
  }

  protected async assertNotVisible(accessibilityId: string): Promise<void> {
    await expect(this.el(accessibilityId)).not.toBeDisplayed();
  }

  async scrollDown(): Promise<void> {
    await browser
      .action('pointer', { parameters: { pointerType: 'touch' } })
      .move({ x: 375, y: 700 })
      .down()
      .move({ x: 375, y: 300, duration: 400 })
      .up()
      .perform();
  }
}
