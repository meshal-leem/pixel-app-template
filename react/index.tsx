import { canUseDOM } from 'vtex.render-runtime'
import type { PixelMessage } from './typings/events'
import fbqEvent from './fbq'
import snaptrEvent from './snaptr'

export function handleEvents(e: PixelMessage) {
  if (e.data.eventName === 'vtex:orderPlaced') {
    const { transactionTotal: value, salesChannel, transactionProducts } = e.data
    const event_id = e.data.ordersInOrderGroup[0];
    const currency =
      salesChannel === "2" ? "AED" :
        salesChannel === "3" ? "SAR" :
          salesChannel === "4" ? "GBP" : "USD"
    const content_ids = transactionProducts.map(({ sku: id }) => (id))
    fbqEvent('Purchase', { value, currency, event_id, content_ids, content_type: "product" })
    snaptrEvent('PURCHASE', {
      price: value,
      currency: currency,
      transaction_id: event_id,
      item_ids: content_ids,
      item_category: transactionProducts[0]?.category || '',
      number_items: transactionProducts.length,
      uuid_c1: '',
      user_email: e.data.visitorContactInfo[0] || '',
      user_phone_number: e.data.visitorContactPhone || '',
    });
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}