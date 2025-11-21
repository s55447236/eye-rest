document.addEventListener('DOMContentLoaded', () => {
    const intervalInput = document.getElementById('interval');
    const enabledInput = document.getElementById('enabled');
    const saveBtn = document.getElementById('save-btn');
    const testBtn = document.getElementById('test-btn');
    const status = document.getElementById('status');

    // Load saved settings
    chrome.storage.sync.get(['interval', 'enabled'], (items) => {
        if (items.interval) intervalInput.value = items.interval;
        if (items.enabled !== undefined) enabledInput.checked = items.enabled;
    });

    // Save settings
    saveBtn.addEventListener('click', () => {
        const interval = parseInt(intervalInput.value);
        const enabled = enabledInput.checked;

        if (interval < 1) {
            status.textContent = "Interval must be at least 1 minute.";
            status.style.color = "red";
            return;
        }

        chrome.storage.sync.set({
            interval: interval,
            enabled: enabled
        }, () => {
            // Notify background script to update alarm
            chrome.runtime.sendMessage({
                action: "updateSettings",
                interval: interval,
                enabled: enabled
            });

            status.textContent = "Settings saved!";
            status.style.color = "green";
            setTimeout(() => {
                status.textContent = "";
            }, 2000);
        });
    });

    // Test Now
    testBtn.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            if (!currentTab) {
                status.textContent = "No active tab found.";
                return;
            }

            if (!currentTab.url || currentTab.url.startsWith("chrome://") || currentTab.url.startsWith("edge://") || currentTab.url.startsWith("about:")) {
                status.textContent = "Cat cannot appear on this system page.";
                status.style.color = "red";
                return;
            }

            status.textContent = "Summoning cat...";
            status.style.color = "blue";

            chrome.runtime.sendMessage({ action: "testNow" }, (response) => {
                // Optional: handle response if we added one in background.js
            });

            // Close after a short delay so user sees the message
            setTimeout(() => {
                window.close();
            }, 1500);
        });
    });
});
