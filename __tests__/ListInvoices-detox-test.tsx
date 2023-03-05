import {by, device, element, expect} from 'detox';

describe('ListInvoicesScreen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should render the ListInvoicesScreen', async () => {
    await device.launchApp({newInstance: true});
    await expect(element(by.id('list-invoices-screen'))).toBeVisible();
  });

  it('should display a list of invoices', async () => {
    await device.launchApp({newInstance: true});
    await expect(element(by.id('invoice-list'))).toBeVisible();
    const invoiceCount = await element(
      by.id('invoice-list'),
    ).getComponentCount();
    expect(invoiceCount).toBeGreaterThan(0);
  });

  it('should display invoice details when an invoice is clicked', async () => {
    await device.launchApp({newInstance: true});
    await expect(element(by.id('invoice-list'))).toBeVisible();
    await element(by.id('invoice-item-0')).tap();
    await expect(element(by.id('invoice-details-screen'))).toBeVisible();
    await expect(element(by.id('invoice-reference'))).toBeVisible();
    await expect(element(by.id('invoice-date'))).toBeVisible();
    await expect(element(by.id('invoice-description'))).toBeVisible();
    await expect(element(by.id('invoice-amount'))).toBeVisible();
  });

  it('should be able to search for an invoice', async () => {
    await device.launchApp({newInstance: true});
    await expect(element(by.id('invoice-search-input'))).toBeVisible();
    await element(by.id('invoice-search-input')).typeText('Reference 1');
    await element(by.id('invoice-search-button')).tap();
    await expect(element(by.id('invoice-list'))).toBeVisible();
    const invoiceCount = await element(
      by.id('invoice-list'),
    ).getComponentCount();
    expect(invoiceCount).toEqual(1);
  });
});
