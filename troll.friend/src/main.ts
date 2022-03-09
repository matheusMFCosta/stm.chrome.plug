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
        path: './dist/jumpingChar.css',
    },
}

const applyCss = async (filePath: string, tabId: number): Promise<void> => {
    return await chrome.scripting.insertCSS({
        target: {tabId: tabId},
        files: [filePath],
    })
}

const jumpping = (fileClassName: string, intensity: number) => {
    const p = []
    for (let i = 0; i < intensity; i++) {
        //@ts-ignore
        const pList = this!.document.getElementsByTagName('p')
        const listCount = pList.length
        const pIndex = Math.floor(Math.random() * listCount)
        const element: any = pList[pIndex]
        const PChildren: any[] = [...(element.childNodes as any)]
        let i = 0
        const newNodes: any[][] = PChildren.map((child, index) => {
            console.log(child.nodeName)
            if (child.nodeName !== '#text' || (child.nodeName === 'DIV' && child.className === 'jumpingCss')) return child
            console.log('child2', child, child.innerText, child.nodeName)

            const splitText = child.textContent.split('')
            const randomCharacterIndex = Math.floor(Math.random() * (splitText.length - 1))
            const text = document.createTextNode(splitText[randomCharacterIndex] || '')

            const newparentDivElement = document.createElement('div')
            newparentDivElement.classList.add(fileClassName)

            newparentDivElement.appendChild(text)
            console.log(i, text, splitText, randomCharacterIndex)
            i = i + 1
            return [
                splitText.slice(0, randomCharacterIndex).join(''),
                newparentDivElement,
                splitText.slice(randomCharacterIndex + 1, splitText.length).join(''),
            ]
        })

        console.log('newNodes', newNodes)
        element.replaceChildren(...newNodes.flat(1))
    }
}

const applyJs = (tabId: number, fileClassName: string, intensity: number) => {
    chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: jumpping,
        args: [fileClassName, intensity],
    })
}

const intensityMap = {
    low: 10,
    medium: 25,
    hight: 100,
}

export const main = async (tabId) => {
    console.log('00', tabId)
    const effect = ElementEffect.Jumping
    const getCurrentEffect = effectMap[effect]
    const fileCssPath = getCurrentEffect.path
    const fileClassName = getCurrentEffect.className
    const intensity = intensityMap.hight
    await applyCss(fileCssPath, tabId)
    applyJs(tabId, fileClassName, intensity)
    console.log('dddå')
}
