import { ActiveTab } from 'src/types/types'
import OpenStudySession from './OpenStudySessionButton'

function Study({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
	if (activeTab != 'Study') return <></>

	return (
		<div id="Study">
			<h1>Testing For study Session.</h1>
			<OpenStudySession /> {}

		</div>
	)
}

  
export default Study