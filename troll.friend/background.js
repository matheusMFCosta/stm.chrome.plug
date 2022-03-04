






chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        console.log('INJECTED THE FOREGROUND STYLES.')

        chrome.scripting
            .executeScript({
                target: {tabId: tabId},
                files: ['./dist/main.js'],
            })
            .then(() => {
                console.log('INJECTED THE FOREGROUND SCRIPT.')
            })
            .catch((err) => console.log(err))
    }
})
