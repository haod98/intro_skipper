chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        let timeToSkip = 0;
        timeToSkip = parseInt(request.getTime);
        if (request.getTime && typeof (timeToSkip) === "number" && !isNaN(timeToSkip)) { //Checks if there is getTime value, if timeSkip is a int, checks if its not a NaN, because NaN is typeof number
            sendResponse({ updatedTime: `Time set: ${request.getTime}` });
            skipVideoAhead(timeToSkip);
        }
    }
);

function skipVideoAhead(timeSkip) {
    try {
        const video = document.querySelector('video');
        video.currentTime += timeSkip;
    } catch (e) {
        console.log(e);
    }
}
