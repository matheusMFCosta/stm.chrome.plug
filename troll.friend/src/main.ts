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

const jumpping = (fileClassName: string) => {
    const pList = this!.document.getElementsByTagName('p')
    const listCount = pList.length
    const pIndex = 5 //Math.floor(Math.random() * (listCount ))
    const element: any = pList[pIndex]
    const PChildren: any[] = [...(element.childNodes as any)]

    console.log('---')
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


const applyJs = (tabId: number, fileClassName: string) => {
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: jumpping,
        args: [fileClassName],
    })
}



export const main = async (tabId) => {
    console.log('00', tabId)
    const effect = ElementEffect.Jumping
    const getCurrentEffect = effectMap[effect]
    const fileCssPath = getCurrentEffect.path
    const fileClassName = getCurrentEffect.className
    applyCss(fileCssPath, tabId)
    const elementId: number = +new Date()

    applyJs(tabId, fileClassName)
    console.log('dddå')
}
