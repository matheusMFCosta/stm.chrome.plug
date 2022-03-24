import React, {useCallback, useMemo, useState} from 'react'
import './App.css'
import './styles/dist.css'
import {Card, Nullable, SubTitle, Tab, Tabs} from '@stone-payments/infinity'
import JumpingController from './jumpping/controller'
//import '../styles/css/dist.css'

function App() {
    const [tab, setTab] = useState({})

    const onChangeTab = useCallback((t: string) => {
        setTab(t)
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <div className="flex flex-col">
                    <div className="flex flex-center">Troll Friend</div>
                    <span className="flex flex-center text-xs">jump letter</span>
                </div>
                <div className="w-1/2 ">
                    <Tabs activeTab={'jumping'} onChangeTab={onChangeTab}>
                        <Tab id="jumping" title="Jumping">
                            <JumpingController />
                        </Tab>
                        <Tab id="Sound" title="Sound">
                            <span> Comming soon</span>
                        </Tab>
                    </Tabs>
                </div>
            </header>
        </div>
    )
}

export default App
