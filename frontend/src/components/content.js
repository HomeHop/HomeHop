// Function to wait for the map container to load
const waitForMap = () => {
  const mapContainer = document.querySelector('#scene');
  if (mapContainer) {
    injectExtensionScripts();
  } else {
    setTimeout(waitForMap, 500);
  }
};

// Function to inject the extension ID and communication script into the page
const injectExtensionScripts = () => {
  // Inject the extension ID into the page
  const idScript = document.createElement('script');
  idScript.setAttribute('type', 'application/javascript');
  idScript.textContent = `var myExtId = "${chrome.runtime.id}";`;
  (document.head || document.documentElement).appendChild(idScript);

  // Inject the message communication script
  const messageScript = document.createElement('script');
  messageScript.setAttribute('type', 'application/javascript');
  messageScript.textContent = `
    // Fetch house data from the extension and inject markers
    chrome.runtime.sendMessage(myExtId, { 
        type: 'GET_HOUSES'
    }, response => {
        if (response && response.houseData) {
            console.log('Received house data from extension:', response.houseData);

            // Inject markers directly into the map
            response.houseData.forEach(house => {
                const marker = document.createElement('div');
                marker.style.position = 'absolute';
                marker.style.background = 'red';
                marker.style.borderRadius = '50%';
                marker.style.width = '15px';
                marker.style.height = '15px';
                marker.style.cursor = 'pointer';
                marker.title = \`\${house.name}: \${house.price}\`;

                marker.addEventListener('click', () => {
                    alert(\`\${house.name}\\nPrice: \${house.price}\`);
                });

                const mapCanvas = document.querySelector('.widget-scene-canvas');
                if (mapCanvas) {
                    mapCanvas.appendChild(marker);
                }
            });
        } else {
            console.error('Failed to fetch house data from extension:', response);
        }
    });
  `;
  (document.head || document.documentElement).appendChild(messageScript);

  // Cleanup injected scripts after execution
  idScript.remove();
  messageScript.remove();
};

// Initialize
waitForMap();
