chrome.tabs.onUpdated.addListener (tabId, info) ->
  chrome.tabs.executeScript(null, {file: "js/substitutions.js"})


chrome.browserAction.onClicked.addListener () ->
  chrome.tabs.create {url:"html/options.html"}, (tab) ->
    chrome.tabs.update tab.id, {selected : true}
