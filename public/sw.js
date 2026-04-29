// public/sw.js
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  self.skipWaiting(); // Force the waiting service worker to become the active one
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(clients.claim()); // Take control of all open tabs immediately
});

// This handles background push notifications
self.addEventListener("push", (event) => {
  const data = event.data
    ? event.data.json()
    : { title: "Alert", body: "New Message" };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/logo.png",
    }),
  );
});

// Optional: Handle what happens when the user clicks the notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/"), // Opens your dashboard when clicked
  );
});
