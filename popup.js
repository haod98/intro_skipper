const btn = document.querySelector(".skip");
const input = document.querySelector('.input');
const error_msg = document.querySelector('.errorMsg');
const settings = document.querySelector('.settings');

window.addEventListener('DOMContentLoaded', async () => { //Load initial value
    const chromeStorage = await chrome.storage.sync.get(null); //Get all values in chrome storage 
    if (chromeStorage.exists) {
        const chromeStoredSeconds = await chromeStorage.seconds;
        input.value = chromeStoredSeconds;
    } else {
        input.value = "60";
    };
});

const fastForward = () => {
    let inputValue = input.value;
    removeErrorMessage();
    if (!inputValue.match(/^[0-9]+$/)) { //Check if input only consist of ints 
        input.classList.add('error');
        createErrorMessage();
        return;
    };
    sendTimeToContentSide(inputValue);
};

let typingTimeout = null;
input.addEventListener('keyup', () => {
    if (typingTimeout !== null) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        saveTimeInLocalStorage(input.value);
    }, 500);
});

const saveTimeInLocalStorage = (time) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { setTime: time }, (response) => {
            console.log(response.updatedTime);
        });
    });
};

btn.addEventListener('click', fastForward); //Pop up event 

//Short cut listener
chrome.runtime.onMessage.addListener(
    (request) => {
        switch (request.msg) {
            case ('fast-forward'):
                fastForward();
                break;
        };
    }
);

const sendTimeToContentSide = (time) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { time: time }, (response) => {
            console.log(response.updatedTime);
        });
    });
};

const createErrorMessage = () => {
    const p = document.createElement('p');
    p.textContent = "Please use a number (seconds)"
    p.classList.add('error-msg');
    settings.appendChild(p);
};

const removeErrorMessage = () => {
    const errorMsg = document.querySelector(".error-msg");
    if (errorMsg) errorMsg.remove();
};