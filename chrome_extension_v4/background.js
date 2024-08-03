console.log("deeom")
chrome.action.onClicked.addListener(async (tab) => {
  console.log('Extension icon clicked'); // Initial log to check if the event is registered
  try {
    const response = await chrome.tabs.sendMessage(tab.id, { action: 'fetchUrl' });
    console.log('URL fetched:', response ? response.url : 'No response'); // Debug statement
    if (response && response.url) {
      const res = await fetch('http://localhost:3000/fetch-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: response.url })
      });
      const data = await res.json();
      console.log('Certificate data saved:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
