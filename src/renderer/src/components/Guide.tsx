import { useState } from 'react'

const slides = [
  {
    title: 'Welcome to Flashflow!',
    content:
      'Flashflow is a user-friendly flashcard app that is designed to improve your memorization!'
  },
  {
    title: 'How to Make Decks',
    content: 'Create a new deck by entering its name and clicking the "+" button under "Decks."'
  },
  {
    title: 'How to Make Cards',
    content: 'In the "Cards" tab, press the green "+" icon and fill in the required fields.'
  },
  {
    title: 'How to Start Study Sessions',
    content: 'In the "Study" tab, you can check whichever decks you would like to study.'
  },
  {
    title: 'Check Study Progress During Sessions',
    content: 'You can rate card difficulty and track progress with "Show Study Progress".'
  },
  {
    title: "That's All!",
    content:
      "If you're confused about the function of anything, just hover over it and a tooltip will appear!"
  }
]

const Guide = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose() // Close the guide on the last step
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const ProgressBar = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      {slides.map((_, index) => (
        <div
          key={index}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: index === currentStep ? '#314459' : 'lightgrey',
            margin: '0 5px'
          }}
        />
      ))}
    </div>
  )

  // Popup styling
  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Centering
    width: '400px', // Set a fixed width
    height: '200px', // Set a fixed height
    overflow: 'auto',
    backgroundColor: '#e8e4ec',
    padding: '20px',
    zIndex: 100,
    borderRadius: '10px', // Round up the edges
    boxShadow: '0 4px 8px rgba(0, 0, 0, 1)' // Drop shadow to add depth
  }

  // Button styling
  const buttonStyle = {
    padding: '10px 15px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '5px', // Rounded edges for buttons
    cursor: 'pointer',
    backgroundColor: '#f0f0f0' // Default button color
  }

  // Hover effects
  const hoverStyle = {
    color: 'white'
  }

  const paragraphText = {
    marginBottom: '20px' // Adjust the value as needed to increase spacing
  }

  const titleText = {
    fontWeight: 'bold',
    color: '#334156'
  }

  return (
    <div className="guide-popup" style={popupStyle}>
      <h2 style={titleText}>{slides[currentStep].title}</h2>
      <p style={paragraphText}>{slides[currentStep].content}</p>
      <div>
        {currentStep > 0 && (
          <button onClick={prevStep} className="popup-button" style={buttonStyle}>
            Previous
          </button>
        )}
        <button
          onClick={nextStep}
          className="popup-button"
          style={{ ...buttonStyle, ':hover': hoverStyle }}
        >
          {currentStep === slides.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
      <ProgressBar />
    </div>
  )
}

export default Guide
