// const styleSheet = document.createElement('style')
// styleSheet.innerText = css
// document.head.appendChild(styleSheet)

enum ElementEffect {
    Jumping = 'jumping',
}

type EffectMap = {
    className: string
    path: string
}
const effectMap: Record<ElementEffect, EffectMap> = {
    [ElementEffect.Jumping]: {
        className: 'jumpingCss',
        path: './jumpingChar.css',
    },
}

const applyCss = (filePath: string, tabId: number) => {
    chrome.scripting.insertCSS({
        target: {tabId: tabId},
        files: [filePath],
    })
}

const findParagraphElement = (): HTMLElement => {
    const pList = this.document.getElementsByTagName('p')
    const listCount = pList.length
    const pIndex = 5 //Math.floor(Math.random() * (listCount ))
    const element: any = pList[pIndex]
    const PChildren: any[] = [...(element.childNodes as any)]
    return element
}

// const setElementEffect = (effect: ElementEffect) => {
//     const getCurrentEffect = effectMap[effect]
//     const fileCssPath = getCurrentEffect.path
//     const fileClassName = getCurrentEffect.path
// }
console.log('222')

async function getCurrentTab() {
    let queryOptions = {active: true, currentWindow: true}
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
}

const main = async () => {
    console.log('00')
    const wow = 1 //await getCurrentTab()

    console.log('----', wow)
    const tabId = wow[0].id

    const effect = ElementEffect.Jumping
    const getCurrentEffect = effectMap[effect]
    const fileCssPath = getCurrentEffect.path
    const fileClassName = getCurrentEffect.path
    applyCss(fileCssPath, tabId)
    console.log("dddå")
    const element = findParagraphElement()
    const PChildren: any[] = [...(element.childNodes as any)]

    const newNodes: any[][] = PChildren.map((child) => {
        console.log(child.nodeName)
        if (child.nodeName !== '#text') return child
        console.log('child2', child, child.innerText, child.nodeName)

        const splitText = child.textContent.split('')
        const randomCharacterIndex = Math.floor(Math.random() * splitText.length)
        const text = document.createTextNode(splitText[randomCharacterIndex])

        const newparentDivElement = document.createElement('div')
        newparentDivElement.classList.add(fileClassName)
        newparentDivElement.appendChild(text)

        return [
            splitText.slice(0, randomCharacterIndex).join(''),
            newparentDivElement,
            splitText.slice(randomCharacterIndex + 1, splitText.length).join(''),
        ]
    })

    console.log('newNodes', newNodes)
    element.replaceChildren(...newNodes.flat(1))
}

main()

