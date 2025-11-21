// Default settings
const DEFAULT_INTERVAL = 60;

// Initialize alarm on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['interval', 'enabled'], (items) => {
    const interval = items.interval || DEFAULT_INTERVAL;
    const enabled = items.enabled !== undefined ? items.enabled : true;

    if (enabled) {
      createAlarm(interval);
    }
  });
});

// Create or replace alarm
function createAlarm(intervalInMinutes) {
  chrome.alarms.clear("eyeRestAlarm", () => {
    chrome.alarms.create("eyeRestAlarm", {
      periodInMinutes: intervalInMinutes
    });
    console.log(`Alarm set for every ${intervalInMinutes} minutes.`);
  });
}

// Handle Alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "eyeRestAlarm") {
    triggerRest();
  }
});

// Trigger the rest overlay
function triggerRest() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      const tabId = tabs[0].id;

      // Check if we can inject into this tab
      if (!tabs[0].url || tabs[0].url.startsWith("chrome://") || tabs[0].url.startsWith("edge://") || tabs[0].url.startsWith("about:")) {
        console.log("Cannot show overlay on system pages or pages with no URL access.");
        return;
      }

      // Try to send message
      chrome.tabs.sendMessage(tabId, { action: "restEyes" }, (response) => {
        if (chrome.runtime.lastError) {
          console.log("Content script not ready. Injecting now...", chrome.runtime.lastError.message);

          // Inject CSS first
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["style.css"]
          }, () => {
            // Then inject JS
            chrome.scripting.executeScript({
              target: { tabId: tabId },
              files: ["content.js"]
            }, () => {
              if (chrome.runtime.lastError) {
                console.error("Failed to inject script:", chrome.runtime.lastError.message);
              } else {
                // Retry sending message
                setTimeout(() => {
                  chrome.tabs.sendMessage(tabId, { action: "restEyes" });
                }, 100);
              }
            });
          });
        }
      });
    }
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateSettings") {
    if (request.enabled) {
      createAlarm(request.interval);
    } else {
      chrome.alarms.clear("eyeRestAlarm");
      console.log("Alarm cleared (disabled).");
    }
  } else if (request.action === "testNow") {
    triggerRest();
  }
});
