chrome.commands.onCommand.addListener((command) => {
    console.log(`${command} pressed`);
    switch (command) {
        case 'fast-forward':
            chrome.runtime.sendMessage({ msg: command });
            break;
    };
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { command: command });
    });
});