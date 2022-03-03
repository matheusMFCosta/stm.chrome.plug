// const styleSheet = document.createElement('style')
// styleSheet.innerText = css
// document.head.appendChild(styleSheet)

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
    newparentDivElement.classList.add('jumpingCss')
    newparentDivElement.appendChild(text)

    return [
        splitText.slice(0, randomCharacterIndex).join(''),
        newparentDivElement,
        splitText.slice(randomCharacterIndex + 1, splitText.length).join(''),
    ]
})

console.log('newNodes', newNodes)
element.replaceChildren(...newNodes.flat(1))
