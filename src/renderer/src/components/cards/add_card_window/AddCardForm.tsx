import React, { useState } from 'react'
import { Card, DeckName, Tag, ExpertNote, Deck } from 'src/types/types'
import CardTagging from './CardTagging'
import CloseWindow from '../CloseWindowButton'
import { getLargestCardID } from '../CardsTable'
import AddSignIcon from '../AddSignIcon'
import { AddGearIcon, AddExponentIcon, AddSubscriptIcon, AddMarkerIcon, AddEraserIcon, AddListIcon, AddNumberedListIcon, AddParagraphIcon, AddClipIcon, AddMicIcon } from './OptionIcons'
import DeleteIcon from '../DeleteIcon'
import AddCardWarnings from './AddCardWarnings'
import AddCardSubmitButton from './AddCardSubmitButton'
import InputColumn from '../InputColumn'
import InputLabel from '../InputLabel'
import { DEFAULT_DECK_NAME } from '../../decks/DeckPage'






function AddCardForm(): JSX.Element {
  async function addCard(): Promise<void> {
    if (!cardFrontInput.trim()) {
      alert('Card front must be filled out.')
      return
    }
    if (expertNotesInput.length > 0) {
      const lastNote = expertNotesInput[expertNotesInput.length - 1]
      if (
        lastNote !== null &&
        lastNote.subtitle.trim().length == 0 &&
        lastNote.body.trim().length == 0
      ) {
        expertNotesInput.pop()
      }
    }
    const cardToAdd: Card = {
      cardID: (await getLargestCardID()) + 1,
      cardFront: cardFrontInput,
      cardBack: cardBackInput,
      sideNote: sideNoteInput,
      expertNotes: expertNotesInput,
      tags: tagsInput,
      belongsToDeck: belongsToDeckInput.length ? belongsToDeckInput : [DEFAULT_DECK_NAME],
      cardStatus: 0 // can be some other type
    }
    // console.log('adding card to database')
    window.api.store.addCard(cardToAdd)
    window.close()
  }

  const [cardFrontInput, setCardFront] = useState<string>('')
  const [cardBackInput, setCardBack] = useState<string>('')
  const [sideNoteInput, setSideNote] = useState<string>('')
  const [tagsInput, setCardTags] = useState<Tag[]>([])
  const [belongsToDeckInput, setBelongsToDeck] = useState<DeckName[]>([])
  const [expertNotesInput, setExpertNotes] = useState<ExpertNote[]>([])
  const [decks, setDecks] = useState<Deck[]>([])
  const [showOptions, setShowOptions] = useState<boolean>(false);


  const handleExpertOptions = () => {
	setShowOptions(!showOptions);
  };


  async function GetDecks(): Promise<void> {
    setDecks(await window.api.store.getAllDecks())
  }
  GetDecks()

  function toggleDeck(name: DeckName): void {
    const tempdeckLst = belongsToDeckInput
    if (tempdeckLst.find((x) => x.localeCompare(name) == 0)) {
      const deckToDeleteIndex = tempdeckLst.findIndex((x) => x.localeCompare(name) == 0)
      tempdeckLst.splice(deckToDeleteIndex, 1)
    } else {
      tempdeckLst.push(name)
    }
    setBelongsToDeck(tempdeckLst)
  }

  const sortedDecks = decks.sort((a, b) => a.name.localeCompare(b.name))

  const deckTblList = sortedDecks.map((deck) => (
    <tr className="bg-slate-100 w-full block" key={deck.name}>
      <td className="pl-2 w-full">
        <input type="checkbox" onClick={() => toggleDeck(deck.name)}></input>
        {' ' + deck.name}
      </td>
    </tr>
  ))




  function changeCardToAddFront(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardFront(event.target.value)
  }

  function changeCardToAddBack(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardBack(event.target.value)
  }

  function changeCardToAddSideNote(event: React.ChangeEvent<HTMLInputElement>): void {
    setSideNote(event.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const addExpertNote = () => {
    const lastNote = expertNotesInput[expertNotesInput.length - 1]
    if (!lastNote || lastNote.subtitle.trim() !== '' || lastNote.body.trim() !== '') {
      setExpertNotes([...expertNotesInput, { subtitle: '', body: '' }])
    } else {
      alert('An empty Expert Note detected. Complete it before adding a new one.')
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleExpertNotesChange = (index: number, type: 'subtitle' | 'body', value: string) => {
    const updatedExpertNote = [...expertNotesInput]
    if (value.trim().length > 0) {
      if (type === 'subtitle') {
        updatedExpertNote[index].subtitle = value
      } else {
        updatedExpertNote[index].body = value
      }
      setExpertNotes(updatedExpertNote)
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const deleteExpertNote = (index: number) => {
    const updatedPairs = expertNotesInput.filter((_, i) => i !== index)
    setExpertNotes(updatedPairs)
  }

  return (
    <div className="grid place-items-center">
      <h1 className="text-2xl font-bold">Insert Card</h1>
	  {!showOptions && (
  		<button onClick={() => handleExpertOptions()} className="absolute top-0 left-0 m-4 bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4">Enable Expert Options</button>
		)}
		{showOptions && (
		<div>
			<button onClick={() => handleExpertOptions()} className="absolute top-0 left-0 m-4 bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4">
				Disable Expert Options
			</button>
		<div className="mb-5"></div>
		<div className="flex flex-wrap">
          <span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md text-white p-1">
            <button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-2 p-4">Fields</button>
            <button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4">Cards...</button>
            <button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4">Type</button>
          </span>
          <span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1">
            <button className="bg-gray-700 border-gray-900 rounded-lg shadow-md flex items-center py-1 px-1 "><AddGearIcon width="20px" height="20px"/></button>
          </span>
          <div className="flex ">
		  	<span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1 flex">
				<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4  text-white font-bold">B</button>
				<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4  text-white italic">I</button>
				<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4  text-white underline">U</button>
			</span>
			<span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1 flex">
				<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-1 p-4 w-9 flex items-center justify-center"><AddExponentIcon width="13px" height="13px"/></button>
				<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 w-9 flex items-center justify-center"><AddSubscriptIcon width="13px" height="13px"/></button>
			</span>
			<span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1 flex">
				<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 text-white underline ">A</button>
				<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"><AddMarkerIcon width="13px" height="13px"/></button>
			</span>
			<span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1 flex">
            	<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"><AddEraserIcon width="13px" height="13px" colour='#FFFFFF'/></button>
			</span>
			<span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-1 flex">
			<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"><AddListIcon width="13px" height="13px" colour='#FFFFFF'/></button>
			<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"><AddNumberedListIcon width="13px" height="15px" colour='#FFFFFF'/></button>
			<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"><AddParagraphIcon width="13px" height="13px" colour='#FFFFFF'/></button>
			</span>
			<span className="bg-gray-700 border border-gray-800 rounded-lg shadow-md p-2 flex">
			<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"><AddClipIcon width="13px" height="13px" colour='#FFFFFF'/></button>
			<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4 flex items-center justify-center"><AddMicIcon width="13px" height="13px" colour='#FFFFFF'/></button>
			<button className="bg-gray-700 border-gray-900 rounded-lg shadow-md py-1 px-3 p-4  text-white italic">fx</button>
			</span>
          </div>
        </div>
      </div>
		)}
      <div className="flex flex-col gap-4">
        <InputColumn>
          <InputLabel>Front</InputLabel>
          <input
            onChange={changeCardToAddFront}
            type="text"
            placeholder={'Front of the card'}
          ></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Back</InputLabel>
          <input
            onChange={changeCardToAddBack}
            type="text"
            placeholder={'Back of the card'}
          ></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Side Note</InputLabel>
          <input
            onChange={changeCardToAddSideNote}
            type="text"
            placeholder={'Your side note goes here ...'}
          ></input>
        </InputColumn>
        <InputColumn>
		  
          {expertNotesInput.map((expertNote, index) => (
            <div key={index} className="flex flex-col gap-4">
              <InputLabel>Expert Note {index + 1}</InputLabel>
              <input
                type="text"
                placeholder="Subtitle"
                value={expertNote.subtitle}
                onChange={(e) => handleExpertNotesChange(index, 'subtitle', e.target.value)}
              />
              <input
                type="text"
                placeholder="Body"
                value={expertNote.body}
                onChange={(e) => handleExpertNotesChange(index, 'body', e.target.value)}
              />
              <button onClick={() => deleteExpertNote(index)} className="ml-auto">
                <DeleteIcon width="30px" height="30px" colour="#D52B1E" />
              </button>
            </div>
          ))}
		  {showOptions && (
			<button onClick={addExpertNote} className="ml-2">
				<AddSignIcon width="30px" height="30px" />
			</button>
		  )}
        </InputColumn>
        <InputColumn>
          <InputLabel>Decks</InputLabel>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <table
              style={{ width: '100%', display: 'block', maxHeight: '70px', overflowY: 'scroll' }}
            >
              {deckTblList}
            </table>
          </div>
        </InputColumn>
        <InputColumn>
          <InputLabel>Tags</InputLabel>
          <CardTagging tempTagPool={tagsInput} setTags={setCardTags} />
        </InputColumn>
        <br />
        <AddCardSubmitButton
          onClick={addCard}
          // cardName={cardToAddName}
          cardFront={cardFrontInput}
          cardBack={cardBackInput}
        />
        <AddCardWarnings
          // cardToAddName={cardToAddName}
          cardFrontInput={cardFrontInput}
          cardBackInput={cardBackInput}
        />
      </div>
      <CloseWindow />
    </div>
  )
}

export default AddCardForm
