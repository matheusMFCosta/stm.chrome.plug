//var checkButton = document.getElementById('two')
//var checkButton = document.getElementById('favorite_0')
// var checkButton = document.getElementById('favorite_1')
// var checkButton = document.getElementById('favorite_2')
// var checkButton = document.getElementById('favorite_3')
// var checkButton = document.getElementById('favorite_4')
// var checkButton = document.getElementById('favorite_5')
// var checkButton = document.getElementById('favorite_6')
// var checkButton = document.getElementById('favorite_7')
// var checkButton = document.getElementById('favorite_8')
// var checkButton = document.getElementById('favorite_9')

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

const sendMessage = (button) => {
    const elementHref = button.getAttribute('href')
    const elementId = button.getAttribute('id')
    chrome.runtime.sendMessage({method: 'saveFavorite', href: elementHref, tagId: elementId}, function (request, sender, sendResponse) {
        if (request.method == 'saveFavorite') {
            console.log('eh')
        }
    })
    button.remove()
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == 'starWatch') {
        var checkButton0 = document.getElementById('favorite_0')
        var checkButton1 = document.getElementById('favorite_1')
        var checkButton2 = document.getElementById('favorite_2')
        var checkButton3 = document.getElementById('favorite_3')
        var checkButton4 = document.getElementById('favorite_4')
        var checkButton5 = document.getElementById('favorite_5')
        var checkButton6 = document.getElementById('favorite_6')
        var checkButton7 = document.getElementById('favorite_7')
        var checkButton8 = document.getElementById('favorite_8')
        var checkButton9 = document.getElementById('favorite_9')

        console.log(checkButton3)

        checkButton0 && checkButton0.addEventListener('click', () => sendMessage(checkButton0), false)
        checkButton1 && checkButton1.addEventListener('click', () => sendMessage(checkButton1), false)
        checkButton2 && checkButton2.addEventListener('click', () => sendMessage(checkButton2), false)
        checkButton3 && checkButton3.addEventListener('click', () => sendMessage(checkButton3), false)
        checkButton4 && checkButton4.addEventListener('click', () => sendMessage(checkButton4), false)
        checkButton5 && checkButton5.addEventListener('click', () => sendMessage(checkButton5), false)
        checkButton6 && checkButton6.addEventListener('click', () => sendMessage(checkButton6), false)
        checkButton7 && checkButton7.addEventListener('click', () => sendMessage(checkButton7), false)
        checkButton8 && checkButton8.addEventListener('click', () => sendMessage(checkButton8), false)
        checkButton9 && checkButton9.addEventListener('click', () => sendMessage(checkButton9, false))
    }
})
