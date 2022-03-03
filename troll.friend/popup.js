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
const css = `\
  .example {
    position: relative;
    animation-name: example;
    animation-duration: 4s;
    animation-timing-function: ease;
    animation-timing-function: linear;
    -webkit-animation-timing-function: linear;
    transition:transform .5s ease-in;
    display: inline-block;
    color: red;
  }

  @keyframes example {
    0%   {left:0px; top:0px;}
    10%   {left:0px; top:0.1px;}
    30% {left:0px; top:0.5px;}
    50%   {left:0px; top:-10px;}
    70%   {left:0px; top:0.5px;}
    9-0% {left:0px; top:0.1px;}
    100% {left:0px; top:0px;}
}`

const styleSheet = document.createElement('style')
styleSheet.innerText = css
document.head.appendChild(styleSheet)

const pList = this.document.getElementsByTagName('p')
const listCount = pList.length
const pIndex = 5 //Math.floor(Math.random() * (listCount ))
const element = pList[pIndex]
const PChildren = [...element.childNodes]
console.log(element.childNodes, PChildren.entries())

const newNodes = PChildren.map((child) => {
    console.log(child.nodeName)
    if (child.nodeName !== '#text') return child
    console.log('child', child, child.innerText, child.nodeName)

    const splitText = child.textContent.split('')
    const randomCharacterIndex = Math.floor(Math.random() * splitText.length)
    const text = document.createTextNode(splitText[randomCharacterIndex])

    const newparentDivElement = document.createElement('div')
    newparentDivElement.classList.add('example')
    newparentDivElement.appendChild(text)

    return [
        splitText.slice(0, randomCharacterIndex).join(''),
        newparentDivElement,
        splitText.slice(randomCharacterIndex + 1, splitText.length).join(''),
    ]
})
element.replaceChildren(...newNodes.flat(1))
