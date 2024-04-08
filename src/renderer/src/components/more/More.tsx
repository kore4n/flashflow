import { ActiveTab } from 'src/types/types'
import DummyButton from '../etc/DummyButton'
import React from 'react'
import CloseWindow from '../cards/CloseWindowButton'

function More({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
  if (activeTab != 'More') return <></>

  return (
    <div className="grid place-items-center pt-10">
      <DummyButton>Import File</DummyButton>
      <DummyButton>Export File</DummyButton>
      <DummyButton>Sync Devices</DummyButton>
      <div className="pt-8"></div>
      <h1>(This section is for UI demonstration purposes only)</h1>
      <div className="pt-16"></div>
      <h1 className="text-3xl">Made by Group 9 at UWO</h1>
      <div className="pt-4"></div>
      <h1 className="text-xl">Jason Kwan</h1>
      <h1 className="text-xl">Jason Shew</h1>
      <h1 className="text-xl">Emily Grant</h1>
      <h1 className="text-xl">Zhong Jie (James) Gao</h1>
      <h1 className="text-xl">Jadd Miguel Arriola</h1>
      <div className="pt-28"></div>
      <CloseWindow />
    </div>
  )
}

export default More
