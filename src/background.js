let port = undefined;
chrome.runtime.onConnect.addListener((port) => {
    port.postMessage("Connected")
    port.onMessage.addListener((msg) => {
        port.postMessage(msg);
    })
})

