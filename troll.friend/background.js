chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.scripting
            .insertCSS({
                target: {tabId: tabId},
                files: ['./jumpingChar.css'],
            })
            .then(() => {
                console.log('INJECTED THE FOREGROUND STYLES.')
                chrome.scripting
                    .executeScript({
                        target: {tabId: tabId},
                        files: ['./jumpingChar.js'],
                    })
                    .then(() => {
                        console.log('INJECTED THE FOREGROUND SCRIPT.')
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }
})
