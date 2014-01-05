chrome.tabs.onUpdated.addListener(function(tabId, info) {
  return chrome.tabs.executeScript(null, {
    file: "js/substitutions.js"
  });
});

chrome.browserAction.onClicked.addListener(function() {
  return chrome.tabs.create({
    url: "html/options.html"
  }, function(tab) {
    return chrome.tabs.update(tab.id, {
      selected: true
    });
  });
});
