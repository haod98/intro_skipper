let btn = document.querySelector(".skip");
btn.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: skipTime
    })
});

function skipTime() {
    const video = document.querySelector('video')
    video.currentTime += 90; //1 min 30 sec
}