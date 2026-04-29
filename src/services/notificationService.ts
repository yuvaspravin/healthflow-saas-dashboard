// 1. Interface extension to handle browser-specific properties
interface ExtendedNotificationOptions extends NotificationOptions {
  vibrate?: number[];
  renotify?: boolean;
}

/**
 * Triggers a notification using the registered Service Worker.
 */
export const sendNotification = async (
  title: string,
  body: string,
): Promise<void> => {
  if (!("Notification" in window)) {
    console.warn("Notifications not supported in this browser.");
    return;
  }

  // Request permission if needed
  if (Notification.permission !== "granted") {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    const options: ExtendedNotificationOptions = {
      body,
      icon: "/logo.png",
      badge: "/logo.png",
      vibrate: [100, 50, 100],
      tag: "healthflow-alert",
      renotify: true,
    };

    await registration.showNotification(title, options);
  } catch (error) {
    console.error("Service Worker notification failed, using fallback:", error);
    // Fallback to standard browser notification if SW fails
    new Notification(title, { body });
  }
};

/**
 * Alias to ensure consistency with Dashboard.tsx
 */
export const sendLocalNotification = sendNotification;
