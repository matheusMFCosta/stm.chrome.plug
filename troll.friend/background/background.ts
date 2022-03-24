import {main} from './main.js'

const appliedUrls: Set<string> = new Set()

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(changeInfo, tabId, tab)
    if (changeInfo.status === 'complete') {
        main(tabId)
        console.log('INJECTED THE FOREGROUND STYLES.ssss')

        // chrome.scripting
        //     .executeScript({
        //         target: {tabId: tabId},
        //         files: ['./dist/main.js'],
        //     })
        //     .then(() => {
        //         console.log('INJECTED THE FOREGROUND SCRIPT.')
        //     })
        //     .catch((err) => console.log(err))
    }
})
