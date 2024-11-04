export default function fbqEvent(eventName: string, data: object) {
    (window as any).fbq?.('track', eventName, data, {
  eventID: `event-${Date.now()}`, // Optional unique identifier
  callback: () => {
    console.log('Event successfully sent to Facebook');
  }
}); 
}