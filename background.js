

chrome.webNavigation.onCompleted.addListener(
  async () => {
    chrome.tabs.query({}, allTabs => {  // get all tabs
      chrome.scripting
        .executeScript({
          target: { tabId: allTabs.filter(t => t.active)[0].id, allFrames: true },
          files: ["coreUi.js"],
        })
        .then(() => console.log("script injected in all frames"));
    });
  },
  {
    url: [
      { urlMatches: 'https://coreui.io/react/docs/*' },
    ]
  }
);



