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
        if (!el.children || el.children.length === 0) {
            return {url: el.url, parentId: el.parentId}
        }
        return getBookMarketKeys(el.children)
    })
}

const getBookMarketFolders = (a) => {
    a.forEach((el) => {
        if (!el.children) return
        bookMarksFolders.push({id: el.id, title: el.title})
        getBookMarketFolders(el.children)
    })

    console.log('bookMarksFoldersbookMarksFoldersbookMarksFolders', bookMarksFolders)
}

chrome.bookmarks.getTree((a) => {
    bookMarks = getBookMarketKeys(a).flat(Infinity)
    getBookMarketFolders(a)

    const favoriteFoldersSelect = document.getElementById('favoriteFolders')
    bookMarksFolders.forEach((el) => {
        console.log('-a', el)
        var option = document.createElement('option')
        option.value = el.id
        option.text = el.title
        favoriteFoldersSelect.add(option)
    })
})

const bbb = () =>
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((index) => {
        const element = document.getElementsByClassName('market_listing_row_link')[`resultlink_${index}`]
        const href = element?.href

        const shouldApply = !bookMarks.some((el) => el === href)
        if (shouldApply) {
            element.insertAdjacentHTML('afterend', `<button id="two" href="${href}">two</button>`)
        }

        console.log(href, bookMarks)
    })

document.addEventListener(
    'DOMContentLoaded',
    function () {
        var saveValueButton = document.getElementById('saveValue')

        // console.log('-----2', bookMarksFolders)
        // var option = document.createElement('option')
        // option.value = bookMarksFolders[0].id
        // option.text = bookMarksFolders[0].title
        // favoriteFoldersSelect.add(option)
        // chrome.tabs.executeScript({
        //     code: `
        // document.getElementsByClassName("btn_green_white_innerfade")[0].click()
        // var value = document.getElementById("market_commodity_buyreqeusts_table") && document.getElementById("market_commodity_buyreqeusts_table").getElementsByTagName("td")[0].innerHTML.split(" ")[1] ||document.getElementsByTagName("td")[0].innerHTML.split(" ")[1];
        // document.getElementById("market_buy_commodity_input_price").value = (parseFloat(value.replace(".","").replace(",", ".")) ${calculateValue(
        //     defaultValue,
        //     isFixed
        // )}).toFixed(2)
        // document.getElementById("market_buyorder_dialog_accept_ssa").checked = true;
        //   `,
        // })

        chrome.tabs.executeScript(
            {
                code: `var bookMarks = ['${bookMarks.map((el) => el.url).join("','")}'];
                        (${bbb.toString()})();`,
            },
            () => {}
        )

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {method: 'starWatch'}, function (response) {})
        })
    },
    false
)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
    const favoriteFoldersSelect = document.getElementById('favoriteFolders')
    const selectedFolder = favoriteFoldersSelect.value

    console.log(bookMarks, request.href)
    // const parentId = bookMarks.find((el) => (el = el.url === request.href)).parentId

    if (request.method == 'saveFavorite') {
        chrome.bookmarks.create({parentId: selectedFolder, url: request.href, title: `script: ${request.href}`}, function (newFolder) {
            console.log('added folder: ' + newFolder.title)
        })
        alert('adicionado')
    }
})
