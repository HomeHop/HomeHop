// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PING") {
      console.log("Content script is active!");
      sendResponse({ status: "READY" });
      return true;
  }

  if (message.type === "RECEIVE_HOUSE_DATA") {
      console.log("Received house data:", message.payload);

      // Inject markers into the map
      const houseData = message.payload;
      houseData.forEach((house) => {
          const marker = document.createElement("div");
          marker.style.position = "absolute";
          marker.style.background = "red";
          marker.style.borderRadius = "50%";
          marker.style.width = "15px";
          marker.style.height = "15px";
          marker.style.cursor = "pointer";
          marker.title = `${house.name}: ${house.price}`;

          marker.addEventListener("click", () => {
              alert(`${house.name}\nPrice: ${house.price}`);
          });

          const mapCanvas = document.querySelector('.aFsglc.widget-scene-canvas');
          console.log(mapCanvas);
          if (mapCanvas) {
              mapCanvas.appendChild(marker);
          }
      });

      sendResponse({ success: true });
      return true;
  }
});
