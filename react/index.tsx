import { canUseDOM } from 'vtex.render-runtime'
import type { PixelMessage } from './typings/events'
import fbqEvent from './fbq'

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
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}