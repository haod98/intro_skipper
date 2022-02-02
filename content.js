const setLocalStorageSeconds = (seconds) => {
    const localStorage = window.localStorage;
    localStorage.setItem("seconds", seconds);
    const timeToSkip = parseInt(localStorage.getItem("seconds"));
    return timeToSkip;
};

//Loads users saved seconds
window.addEventListener('DOMContentLoaded', () => {
    if (localStorageSecondsExist()) {
        chrome.storage.sync.set({ seconds: getLocalStorageSeconds(), exists: true });
    };
});

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
        if (request.getTime) {
            let timeInSecond = setLocalStorageSeconds(request.getTime);
            sendResponse({ updatedTime: `Time set: ${request.getTime}` });
            fastForwardVideo(timeInSecond);
        } else if (request.command === "fast-forward") {
            let timeInSeconds = getLocalStorageSeconds();
            sendResponse({ updatedTime: `Time set: ${timeInSeconds}` });
            fastForwardVideo(timeInSeconds);
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
