/* 
Functions for the start study session button when clicked will open a ew window which will
begin the study session 
*/

function StudySession(): void {
  // Open new window
  window.api.openStudySessionWindow()
}

function OpenStudySession(): JSX.Element {
  return (
	<button onClick={StudySession}>Start Study</button>
  )
}

export default OpenStudySession