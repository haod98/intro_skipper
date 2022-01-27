let btn = document.querySelector(".skip");
btn.addEventListener('click', () => {
    let timeValue = document.querySelector('#time').value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { getTime: timeValue }, (response) => {
            console.log(response.updatedTime);
        });
    });
});
