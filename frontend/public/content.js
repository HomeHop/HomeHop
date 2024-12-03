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
      // Find the specific div to attach the marker structure
      const targetDiv = document.querySelector("div.ZAmjL.Hk4XGb");
      if (targetDiv) {
        // Create the container div for the marker and button
        const markerContainer = document.createElement("div");
        markerContainer.setAttribute("jstcache", "608");
        markerContainer.style.position = "absolute";
        markerContainer.style.left = "0px";
        markerContainer.style.top = "0px";
        markerContainer.style.transformOrigin = "left top";
        markerContainer.style.display = "block";

        // Calculate position for the marker based on latitude/longitude
        const { x, y } = latLngToPixel(house.lat, house.lng, targetDiv);
        markerContainer.style.transform = `translate(${x}px, ${y}px) scale(1)`;

        // Create the button inside the marker container
        const button = document.createElement("button");
        button.setAttribute("vet", "12019");
        button.setAttribute("jsaction", "reveal.marker");
        button.setAttribute("jstcache", "217");
        button.className = "WkFAsb IP69L";
        button.setAttribute("jsan", "7.WkFAsb,7.IP69L,0.vet,0.jsaction");
        button.setAttribute("fdprocessedid", "gazytx");
        button.setAttribute("tabindex", "-1");

        // Add event listener for button click
        button.addEventListener("click", () => {
          alert(`Details for ${house.name}\nPrice: ${house.price}`);
        });

        // Append the button to the container
        markerContainer.appendChild(button);

        // Append the marker container to the target div
        targetDiv.appendChild(markerContainer);
      } else {
        console.error("Target div not found!");
      }
    });

    sendResponse({ success: true });
    return true;
  }
});

// Helper function to convert lat/lng to pixel coordinates
function latLngToPixel(lat, lng, targetDiv) {
  // Map's bounding box and dimensions
  const mapBounds = getMapBounds(targetDiv); // Define this function to retrieve bounds
  const mapWidth = targetDiv.offsetWidth;
  const mapHeight = targetDiv.offsetHeight;

  // Calculate pixel coordinates relative to map bounds
  const x = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * mapWidth;
  const y = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * mapHeight;

  return { x, y };
}

// Mock function to retrieve map bounds (implement based on your map library)
function getMapBounds(targetDiv) {
  // Replace with actual bounds logic for your map
  return {
    north: 53.5500, // Example north latitude
    south: 53.5400, // Example south latitude
    east: -113.4900, // Example east longitude
    west: -113.5000, // Example west longitude
  };
}
