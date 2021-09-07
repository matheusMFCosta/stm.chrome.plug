var checkButton = document.getElementById('two')

// checkButton.addEventListener(
//     'click',
//     function () {
//         alert('wow')
//         chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {method: 'changePage'}, function (response) {
//                 if (response.method == 'changePage') {
//                     alert('Succeeded with ' + response.method)
//                 }
//             })
//         })
//     },
//     false
// )

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == 'starWatch') {
        var checkButton = document.getElementById('two')
        checkButton.addEventListener(
            'click',
            function () {
                const elementHref = checkButton.getAttribute('href')
                chrome.runtime.sendMessage({method: 'saveFavorite', href: elementHref}, function (request, sender, sendResponse) {
                    if (request.method == 'saveFavorite') {
                        alert('ddddd')
                    }
                })
            },
            false
        )
    }
})
