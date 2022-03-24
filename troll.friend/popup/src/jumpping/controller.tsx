import React, {useCallback, useMemo, useState} from 'react'
import {Button, CheckboxGroup, Container, RadioBoxGroup, RadioBoxProps, SkeletonListLoading, Strings} from '@stone-payments/infinity'

type List = {
    title: string
    id: number
    name: string
}

const intensityCheckboxOptions: string[] = ['low', 'medium', 'hight', 'insane']
const highlightCheckboxOptions: string[] = ['true', 'false']

const buildOption = (options: string[]) => options.map((x, index) => ({title: x, id: index, name: x}))

function JumpingController() {
    const [intensitySelectedOption, setIntensitySelectOptions] = useState<string>('low')
    const [highlightSelectedOption, setHighlightSelectOptions] = useState<string>('true')

    const intensityOptions: List[] = useMemo(() => buildOption(intensityCheckboxOptions), [intensitySelectedOption])
    const highlightOptions: List[] = useMemo(() => buildOption(highlightCheckboxOptions), [highlightSelectedOption])

    console.log(intensityOptions)

    const handleClick = () => {
        console.log('event')

        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
        //     console.log(response.farewell);
        //   });
        // });
        chrome.runtime.sendMessage({greeting: 'hello'}, function (response) {
            console.log(response.farewell)
        })
    }
    return (
        <div className="App flex flex-col">
            <span>Intensity</span>
            <RadioBoxGroup
                vertical={false}
                className="text-sm"
                containerClassName="mr-2"
                data={intensityOptions}
                label="title"
                name="intensity"
                currentValue={intensitySelectedOption}
                onChange={(el) => setIntensitySelectOptions(el.target.value)}
            />
            <span>Highlight</span>
            <RadioBoxGroup
                vertical={false}
                className="text-sm"
                containerClassName="mr-2"
                data={highlightOptions}
                label="title"
                name="highlight"
                currentValue={highlightSelectedOption}
                onChange={(el) => setHighlightSelectOptions(el.target.value)}
            />
            <Button onClick={handleClick}>Save</Button>
        </div>
    )
}

export default JumpingController
