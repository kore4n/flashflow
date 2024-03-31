import { ActiveTab, Deck } from 'src/types/types';
import { useEffect, useState } from 'react';


/*
	After clicking the study tab this will populate the window with all current decks to choose from 
*/
function Study({ activeTab }: { activeTab: ActiveTab }): JSX.Element {
	const [decks, setDecks] = useState<Deck[]>([]);
	const [selectedDecks, setSelectedDecks] = useState<Deck[]>([]);
	const [showMessage, setShowMessage] = useState<boolean>(false);

    const handleStartStudy = () => {
        if (selectedDecks.length === 0) {
            setShowMessage(true);
        } else {
            setShowMessage(false);
            window.api.openStudySessionWindow();
        }
    };

	useEffect(() => {
		async function GetAllDecks(): Promise<void> {
		  setDecks(await window.api.store.getAllDecks())
		}
	
		GetAllDecks()
	  }, [decks])

	const handleSelectDeck = (deck: Deck) => {
		const isSelected = selectedDecks.some((selectedDeck) => selectedDeck.name === deck.name);
		if (isSelected) {
			setSelectedDecks(selectedDecks.filter((selectedDeck) => selectedDeck.name !== deck.name));
		} else {
			setSelectedDecks([...selectedDecks, deck]);
		}
	};

	if (activeTab !== 'Study') return <></>;

	return (
        <div id="Study" className="mt-8">
            <h1 className="text-xl font-bold text-white mb-4">Choose Decks to Study</h1>
            <div className="deck-list grid gap-2 border rounded p-4">
                {decks.map((deck) => (
                    <label key={deck.name} className="flex items-center gap-2 text-white">
                        <input
                            type="checkbox"
                            checked={selectedDecks.some((selectedDeck) => selectedDeck.name === deck.name)}
                            onChange={() => handleSelectDeck(deck)}
                            className="form-checkbox h-5 w-5 text-blue-500"
                        />
                        <span className="text-lg">{deck.name}</span>
                    </label>
                ))}
            </div>
            <div className="flex justify-center items-center h-screen">
                {showMessage && <p className="text-red-500">You need to select at least one deck to study.</p>}
                <button
                    onClick={handleStartStudy}
                    className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded uppercase"
                >
                    Start Study
                </button>
            </div>
        </div>
    );
}




export default Study;
