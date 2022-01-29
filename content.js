const setLocalStorageSeconds = (seconds) => {
    const localStorage = window.localStorage;
    localStorage.setItem("seconds", seconds);
    const timeToSkip = parseInt(localStorage.getItem("seconds"));
    return timeToSkip;
};

const getLocalStorageSeconds = () => {
    const DEFAULT_SECONDS = 60;
    const localStorage = window.localStorage;
    return localStorageSecondsExist() ? parseInt(localStorage.getItem("seconds")) : DEFAULT_SECONDS;
};

const localStorageSecondsExist = () => {
    const localStorage = window.localStorage;
    return localStorage.getItem("seconds") !== null;
};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        if (request.getTime) {
            let timeInSecond = setLocalStorageSeconds(request.getTime);
            if (request.getTime && typeof (timeInSecond) === "number" && !isNaN(timeInSecond)) { //Checks if there is getTime value, if timeSkip is a int, checks if its not a NaN, because NaN is typeof number
                sendResponse({ updatedTime: `Time set: ${request.getTime}` });
                fastForwardVideo(timeInSecond);
            };
        } else if (request.command === "fast-forward") {
            let fastForwardInSeconds = getLocalStorageSeconds();
            console.log(fastForwardInSeconds);
            sendResponse({ updatedTime: `Time set: ${fastForwardInSeconds}` });
            fastForwardVideo(fastForwardInSeconds);
        };
    }
);
const fastForwardVideo = (fastForwardInSeconds) => {
    try {
        const video = document.querySelector('video');
        video ? video.currentTime += fastForwardInSeconds : console.log('video not found');
    } catch (e) {
        console.log(e);
    };
};
