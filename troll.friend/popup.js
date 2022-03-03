const calculateValue = (value, isFixed) => {
    const calculatedValue = parseFloat(value.replace(',', '.'))

    console.log(`isFixed`, isFixed)
    if (isFixed) {
        return ` + ${calculatedValue}`
    }

    return `* ${calculatedValue / 100}`
}

document.addEventListener(
    'DOMContentLoaded',
    function () {
        var saveValueButton = document.getElementById('saveValue')
        const defaultValueInput = document.getElementById('defaultValue')
        const defaultValue = localStorage.getItem('defaultValue') || ''
        const isFixedLocalStorage = localStorage.getItem('isFixed')
        const isFixed = isFixedLocalStorage === 'true' || isFixedLocalStorage === null ? true : false
        defaultValueInput.setAttribute('value', defaultValue)
        defaultValueInput.setAttribute('isFixed', isFixedLocalStorage)

        isFixed && document.getElementById('fixed').click()

        console.log(calculateValue(defaultValue, isFixed))

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

        saveValueButton.addEventListener(
            'click',
            function () {
                const wiw = document.getElementsByClassName('market_listing_row_link')[0].href
                alert(wiw)
                chrome.tabs.getSelected(null, function (tab) {
                    const defaultValueInputValue = defaultValueInput.value
                    const isFixed = document.getElementById('fixed').checked
                    localStorage.setItem('isFixed', isFixed)
                    localStorage.setItem('defaultValue', defaultValueInputValue)
                })
            },
            false
        )
    },
    false
)
