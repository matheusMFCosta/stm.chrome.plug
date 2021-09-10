const calculateValue = (value, isFixed) => {
    const calculatedValue = parseFloat(value.replace(',', '.'))

    console.log(`isFixed`, isFixed)
    if (isFixed) {
        return ` + ${calculatedValue}`
    }

    return `* ${calculatedValue / 100}`
}

let bookMarks = []
var bookMarksFolders = []
let pageProducts

const getBookMarketKeys = (a) => {
    return a.map((el) => {
        console.log('el el el ', el)
        if (!el.children || el.children.length === 0) {
            return {url: el.url, parentId: el.parentId}
        }
        return getBookMarketKeys(el.children)
    })
}

const getBookMarketFolders = (a) =>
    a.forEach((el) => {
        if (!el.children) return
        bookMarksFolders.push({id: el.id, title: el.title})
        getBookMarketFolders(el.children)
    })

chrome.bookmarks.getTree((a) => {
    bookMarks = getBookMarketKeys(a).flat(Infinity)
    getBookMarketFolders(a)

    const favoriteFoldersSelect = document.getElementById('favoriteFolders')
    bookMarksFolders.forEach((el) => {
        var option = document.createElement('option')
        option.value = el.id
        option.text = el.title
        favoriteFoldersSelect.add(option)
    })
})

const functionToApplyOnPage = () => {
    const elements = document.getElementsByClassName('market_listing_row_link')
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((index) => {
        const element = elements[index]
        const href = element?.href

        const shouldApply = !bookMarks.some((el) => el.includes(href))
        if (shouldApply) {
            element.insertAdjacentHTML('afterend', `<button id="favorite_${index}" href="${href}">Favoritar</button>`)
        }
    })
}

const chromeExecuteScript = (script) => {
    chrome.tabs.executeScript({code: script}, () => {})
}

const loadApp = setTimeout(() => {
    var saveValueButton = document.getElementById('saveValue')
    var favoriteFolders = document.getElementById('favoriteFolders')
    const defaultValue = localStorage.getItem('bm-defaultValue') || favoriteFolders.childNodes[1].value
    favoriteFolders.value = defaultValue

    saveValueButton.addEventListener(
        'click',
        () => {
            localStorage.setItem('bm-defaultValue', favoriteFolders.value)
        },
        false
    )

    chromeExecuteScript(`var bookMarks = ['${bookMarks.map((el) => el.url).join("','")}'];
                    (${functionToApplyOnPage.toString()})();`)

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: 'starWatch'}, function (response) {})
    })
}, 100)

document.addEventListener('DOMContentLoaded', () => loadApp(), false)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const favoriteFoldersSelect = document.getElementById('favoriteFolders')
    const selectedFolder = favoriteFoldersSelect.value
    if (request.method == 'saveFavorite') {
        chrome.bookmarks.create({parentId: selectedFolder, url: request.href, title: `script: ${request.href}`}, function (newFolder) {
            console.log('added folder: ' + newFolder.title)
        })
    }

    alert('adicionado')
})
