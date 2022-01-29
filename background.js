chrome.commands.onCommand.addListener((command) => {
    console.log(`${command} pressed`);
    switch (command) {
        case 'fast-forward':
            chrome.runtime.sendMessage({ msg: command });
            break;
    };
});