// Listener for external messages from content scripts or injected scripts
chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  console.log("Received external message:", request, "from:", sender.url);

  if (request.type === 'GET_HOUSES') {
      // Retrieve house data from storage and send it back
      chrome.storage.local.get('houseData', (result) => {
          console.log("Sending house data to injected script:", result.houseData || []);
          sendResponse({ houseData: result.houseData || [] });
      });
      return true; // Keep the channel open for async response
  } else if (request.type === 'ADD_MARKERS') {
      const houseData = request.payload;

      // Save house data in local storage
      chrome.storage.local.set({ houseData }, () => {
          console.log("House data saved:", houseData);

          // Open or activate Google Maps
          chrome.tabs.query({ url: 'https://www.google.com/maps/*' }, (tabs) => {
              if (tabs.length > 0) {
                  console.log("Google Maps tab found. Activating it.");
                  chrome.tabs.update(tabs[0].id, { active: true });
              } else {
                  console.log("Google Maps not open. Opening a new tab.");
                  chrome.tabs.create({ url: 'https://www.google.com/maps/' });
              }
          });

          sendResponse({ success: true });
      });
      return true; // Keep the channel open for async response
  } else {
      console.error("Unknown message type:", request.type);
      sendResponse({ success: false, error: "Unknown message type" });
  }
});

// Listener for internal messages (optional if needed for debugging or internal processes)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received internal message:", message, "from:", sender);

  if (message.type === 'DEBUG') {
      sendResponse({ success: true, message: "Debugging response from background.js" });
  }
  return true;
});

// Debugging: Log when the background script is loaded
console.log("Background script initialized.");
