import {by, device, element, expect} from 'detox';

describe('Create Invoice Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await device.launchApp({newInstance: true});
  });

  it('should create an invoice successfully', async () => {
    await expect(element(by.id('reference-input'))).toBeVisible();
    await expect(element(by.id('date-input'))).toBeVisible();
    await expect(element(by.id('description-input'))).toBeVisible();
    await expect(element(by.id('amount-input'))).toBeVisible();
    await expect(element(by.id('submit-button'))).toBeVisible();

    await element(by.id('reference-input')).typeText('INV-001');
    await element(by.id('date-input')).typeText('2022-03-01');
    await element(by.id('description-input')).typeText('Test invoice');
    await element(by.id('amount-input')).typeText('1000');
    await element(by.id('submit-button')).tap();

    await expect(
      element(by.text('Invoice created successfully!')),
    ).toBeVisible();
    await expect(element(by.id('reference-input'))).toHaveText('');
    await expect(element(by.id('date-input'))).toHaveText('');
    await expect(element(by.id('description-input'))).toHaveText('');
    await expect(element(by.id('amount-input'))).toHaveText('');
  });
});
