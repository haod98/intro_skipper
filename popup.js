const btn = document.querySelector(".skip");
const input = document.querySelector('.input');
const error_msg = document.querySelector('.errorMsg');
const settings = document.querySelector('.settings');
console.log(input);
btn.addEventListener('click', () => {
    let timeValue = document.querySelector('#time').value;
    input.classList.remove('error');
    removeErrorMessage();
    if (!timeValue.match(/^[0-9]+$/)) { //Check if input is an int
        input.classList.add('error');
        createErrorMessage();
        return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { getTime: timeValue }, (response) => {
            console.log(response.updatedTime);
        });
    });
});

const createErrorMessage = () => {
    const p = document.createElement('p');
    p.textContent = "Please use a number (seconds)"
    p.classList.add('error-msg');
    settings.appendChild(p);
}

const removeErrorMessage = () => {
    const errorMsg = document.querySelector(".error-msg");
    if (errorMsg) errorMsg.remove();
}