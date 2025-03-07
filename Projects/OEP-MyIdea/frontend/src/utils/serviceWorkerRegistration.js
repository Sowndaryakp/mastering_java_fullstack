export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/serviceWorker.js')
        .then((registration) => {
          console.log('ServiceWorker registered:', registration);

          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }

            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available, notify user
                  dispatchEvent(new CustomEvent('swUpdate'));
                }
              }
            });
          });
        })
        .catch((error) => {
          console.error('Error registering service worker:', error);
        });

      // Handle offline/online status
      window.addEventListener('online', () => {
        navigator.serviceWorker.ready.then((registration) => {
          registration.sync.register('sync-updates');
        });
      });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error('Error unregistering service worker:', error);
      });
  }
} 