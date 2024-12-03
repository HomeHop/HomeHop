chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");

    // Clear any existing rules with the same ID before adding new ones
    chrome.declarativeNetRequest.updateDynamicRules(
        {
            removeRuleIds: [1], // Remove the rule with ID 1 if it exists
            addRules: [
                {
                    id: 1,
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        urlFilter: "https://www.google.com/maps/*",
                        resourceTypes: ["main_frame"]
                    }
                }
            ]
        },
        () => {
            if (chrome.runtime.lastError) {
                console.error("Error updating rules:", chrome.runtime.lastError.message);
            } else {
                console.log("Rules updated successfully");
            }
        }
    );
});

// Open Google Maps if not already open
const openGoogleMaps = async () => {
    const tabs = await chrome.tabs.query({ url: "https://www.google.com/maps/*" });
    if (tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { active: true });
        return tabs[0]; // Return the existing tab
    } else {
        return new Promise((resolve) => {
            chrome.tabs.create({ url: "https://www.google.com/maps" }, (newTab) => {
                console.log("Opened Google Maps:", newTab);
                resolve(newTab);
            });
        });
    }
};

// Dynamically inject content.js
const injectContentScript = (tabId, callback) => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            files: ["content.js"]
        },
        () => {
            if (chrome.runtime.lastError) {
                console.error("Error injecting content script:", chrome.runtime.lastError.message);
            } else {
                console.log("Content script injected successfully!");
                if (callback) callback();
            }
        }
    );
};

// Check if the content script is ready
const checkContentScriptReady = (tabId, callback) => {
    chrome.tabs.sendMessage(tabId, { type: "PING" }, (response) => {
        if (chrome.runtime.lastError) {
            console.warn("Content script not ready:", chrome.runtime.lastError.message);
            injectContentScript(tabId, () => checkContentScriptReady(tabId, callback)); // Inject and retry
        } else if (response && response.status === "READY") {
            console.log("Content script is ready!");
            callback();
        }
    });
};

// Open Google Maps and ensure content script is ready
const openAndPrepareGoogleMaps = async () => {
    const tab = await openGoogleMaps();
    checkContentScriptReady(tab.id, () => {
        console.log("Google Maps and content script are ready!");
    });
};

// Example of sending data to the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "OPEN_GOOGLE_MAPS") {
        openAndPrepareGoogleMaps().then(() => sendResponse({ success: true }));
        return true; // Indicate asynchronous response
    }

    if (message.type === "ADD_MARKERS") {
        chrome.tabs.query({ url: "https://www.google.com/maps/*" }, (tabs) => {
            if (tabs.length > 0) {
                const tabId = tabs[0].id;
                checkContentScriptReady(tabId, () => {
                    chrome.tabs.sendMessage(
                        tabId,
                        { type: "RECEIVE_HOUSE_DATA", payload: message.payload },
                        (response) => {
                            if (chrome.runtime.lastError) {
                                console.error("Error sending markers:", chrome.runtime.lastError.message);
                            } else {
                                console.log("Markers sent successfully:", response);
                            }
                        }
                    );
                });
            } else {
                console.error("No Google Maps tab found!");
            }
        });
        sendResponse({ success: true });
        return true;
    }
});
