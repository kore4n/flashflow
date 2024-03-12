import { useState, useEffect } from 'react';
import { Card } from 'src/types/types';

function ShowCard({ cards }: { cards: Card[] }): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [showButtons, setShowButtons] = useState<boolean>(false);

    console.log('StudySession...');

    if (cards.length === 0) {
        return <div>You have no cards!</div>;
    }

    const currentCard = cards[currentIndex];

    const handleShowAnswer = () => {
        setShowAnswer(true);
        setShowButtons(true);
    };

    const handleNextCard = () => {
        setShowAnswer(false);
        setShowButtons(false);
        setCurrentIndex(prevIndex => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
			<div className="flex flex-col items-center justify-center flex-grow">
				<h2 className="font-bold">{showAnswer ? 'Back Field' : 'Front Field'}</h2>
				<div>
					<p>Front: {currentCard.front}</p>
					{showAnswer && 
						<p>Back: {currentCard.back}</p>
					}
				</div>
			</div>
			{!showAnswer && (
            <button
                onClick={handleShowAnswer}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Show Answer
            </button>
			)}
            {showButtons && (
                <div className="flex flex-row justify-center space-x-4  mt-auto">
                    <button onClick={handleNextCard} className="bg-transparent hover:bg-transparent text-white font-bold py-2 px-4 rounded">Again</button>
                    <button onClick={handleNextCard} className="bg-transparent hover:bg-transparent text-white font-bold py-2 px-4 rounded">Hard</button>
                    <button onClick={handleNextCard} className="bg-transparent hover:bg-transparent text-white font-bold py-2 px-4 rounded">Good</button>
                    <button onClick={handleNextCard} className="bg-transparent hover:bg-transparent text-white font-bold py-2 px-4 rounded">Easy</button>
                </div>
            )}
        </div>
    );
}

function StudySession(): JSX.Element {
    const [cards, setCards] = useState<Card[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function GetAllCards(): Promise<void> {
            const cards = await window.api.store.getAllCards();
            setCards(cards);
            setLoading(false);
        }

        GetAllCards();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ShowCard cards={cards} />
        </div>
    );
}

export default StudySession;
