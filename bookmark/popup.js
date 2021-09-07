const calculateValue = (value, isFixed) => {
    const calculatedValue = parseFloat(value.replace(',', '.'))

    console.log(`isFixed`, isFixed)
    if (isFixed) {
        return ` + ${calculatedValue}`
    }

    return `* ${calculatedValue / 100}`
}

let bookMarks = []
let pageProducts

const getBookMarketKeys = (a) => {
    return a.map((el) => {
        if (!el.children || el.children.length === 0) {
            return el.url
        }
        return getBookMarketKeys(el.children)
    })
}

chrome.bookmarks.getTree((a) => {
    bookMarks = getBookMarketKeys(a).flat(Infinity)
    console.log(bookMarks)
})

const bbb = () =>
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((index) => {
        const element = document.getElementsByClassName('market_listing_row_link')[`resultlink_${index}`]
        const href = element?.href

        const shouldApply = bookMarks.some((el) => el === href)
        if (shouldApply) {
            element.insertAdjacentHTML('afterend', '<button id="two">two</button>')
        }

        console.log(href, bookMarks)
    })

document.addEventListener('click', function (e) {
    console.log('aaaa')
    if (e.target.matches('#two')) {
        alert('clicked!')
    }
})

document.addEventListener(
    'DOMContentLoaded',
    function () {
        console.log(222)
        var saveValueButton = document.getElementById('saveValue')
        const defaultValueInput = document.getElementById('defaultValue')
        const defaultValue = localStorage.getItem('defaultValue') || ''
        const isFixedLocalStorage = localStorage.getItem('isFixed')
        const isFixed = isFixedLocalStorage === 'true' || isFixedLocalStorage === null ? true : false
        defaultValueInput.setAttribute('value', defaultValue)
        defaultValueInput.setAttribute('isFixed', isFixedLocalStorage)

        isFixed && document.getElementById('fixed').click()

        chrome.tabs.executeScript({
            code: `
        document.getElementsByClassName("btn_green_white_innerfade")[0].click()
        var value = document.getElementById("market_commodity_buyreqeusts_table") && document.getElementById("market_commodity_buyreqeusts_table").getElementsByTagName("td")[0].innerHTML.split(" ")[1] ||document.getElementsByTagName("td")[0].innerHTML.split(" ")[1];
        document.getElementById("market_buy_commodity_input_price").value = (parseFloat(value.replace(".","").replace(",", ".")) ${calculateValue(
            defaultValue,
            isFixed
        )}).toFixed(2)
        document.getElementById("market_buyorder_dialog_accept_ssa").checked = true;
          `,
        })

        chrome.tabs.executeScript(
            {code: `[...document.getElementsByClassName('market_listing_row_link')].map(el => el.href)`},
            (document) => {
                console.log(document[0])
            }
        )

        saveValueButton.addEventListener(
            'click',
            function () {
                console.log('bookMarks', bookMarks)

                console.log(`var bookMarks = ['${bookMarks.join(',')}'];
                (${bbb.toString()})();`)

                chrome.tabs.executeScript(
                    {
                        code: `
                        var bookMarks = ['${bookMarks.join("','")}'];
                        (${bbb.toString()})();`,
                    },
                    (document) => {
                        pageProducts = document[0]
                        console.log(document)
                    }
                )

                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {method: 'starWatch'}, function (response) {})
                })
            },
            false
        )
    },
    false
)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
    if (request.method == 'saveFavorite') {
        alert('ddddd3')
    }
})
