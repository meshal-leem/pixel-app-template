export default function snaptrEvent(eventName: string, data: object) {
  if (typeof (window as any).snaptr === 'undefined') {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://sc-static.net/scevent.min.js';
    script.onload = () => {
      (window as any).snaptr('init', '61c52ad3-92e5-4a39-9709-0e54ddd5955d', {});
      (window as any).snaptr('track', 'PAGE_VIEW');
    };
    document.head.appendChild(script);
  }
  
  (window as any).snaptr?.('track', eventName, data, {
    callback: () => {
      console.log(`Event successfully sent to Snapchat: ${eventName}`);
    },
  });
}
