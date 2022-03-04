var ElementEffect;
(function (ElementEffect) {
    ElementEffect["Jumping"] = "jumping";
})(ElementEffect || (ElementEffect = {}));
const effectMap = {
    [ElementEffect.Jumping]: {
        className: 'jumpingCss',
        path: './jumpingChar.css',
    },
};
const applyCss = (filePath, tabId) => {
    chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: [filePath],
    });
};
const jumpping = (fileClassName) => {
    const pList = this.document.getElementsByTagName('p');
    const listCount = pList.length;
    const pIndex = 5;
    const element = pList[pIndex];
    const PChildren = [...element.childNodes];
    console.log('---');
    const newNodes = PChildren.map((child) => {
        console.log(child.nodeName);
        if (child.nodeName !== '#text')
            return child;
        console.log('child2', child, child.innerText, child.nodeName);
        const splitText = child.textContent.split('');
        const randomCharacterIndex = Math.floor(Math.random() * splitText.length);
        const text = document.createTextNode(splitText[randomCharacterIndex]);
        const newparentDivElement = document.createElement('div');
        newparentDivElement.classList.add(fileClassName);
        newparentDivElement.appendChild(text);
        return [
            splitText.slice(0, randomCharacterIndex).join(''),
            newparentDivElement,
            splitText.slice(randomCharacterIndex + 1, splitText.length).join(''),
        ];
    });
    console.log('newNodes', newNodes);
    element.replaceChildren(...newNodes.flat(1));
};
const applyJs = (tabId, fileClassName) => {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: jumpping,
        args: [fileClassName],
    });
};
export const main = async (tabId) => {
    console.log('00', tabId);
    const effect = ElementEffect.Jumping;
    const getCurrentEffect = effectMap[effect];
    const fileCssPath = getCurrentEffect.path;
    const fileClassName = getCurrentEffect.className;
    applyCss(fileCssPath, tabId);
    const elementId = +new Date();
    applyJs(tabId, fileClassName);
    console.log('dddå');
};
