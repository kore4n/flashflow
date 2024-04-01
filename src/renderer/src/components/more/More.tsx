import { ActiveTab } from 'src/types/types'
import DummyButton from '../etc/DummyButton'

function More({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
  if (activeTab != 'More') return <></>

  return (
    <div className="grid place-items-center pt-10">
      <DummyButton>Import File</DummyButton>
      <DummyButton>Export File</DummyButton>
      <DummyButton>Sync Devices</DummyButton>
    </div>
  )
}

export default More
