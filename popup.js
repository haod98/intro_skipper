const btn = document.querySelector(".skip");
const input = document.querySelector('.input');
const error_msg = document.querySelector('.errorMsg');
const settings = document.querySelector('.settings');

window.addEventListener('DOMContentLoaded', async () => {
    const chromeStorage = await chrome.storage.sync.get(null);
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
        fastForward();
    }, 1000);
});

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
        chrome.tabs.sendMessage(tabs[0].id, { getTime: time }, (response) => {
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