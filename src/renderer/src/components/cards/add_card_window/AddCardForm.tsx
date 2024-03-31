import React, { ReactNode, useState } from 'react'
import { Card, DeckName, Tag, ExpertNote } from 'src/types/types'
import CardTagging from './CardTagging'
import CloseWindow from '../CloseWindowButton'
import { getLargestCardID } from '../CardsTable'
import CheckMarkIcon from '../CheckMarkIcon'
import AddSignIcon from '../AddSignIcon'
import DeleteIcon from '../DeleteIcon'
import { subtle } from 'node:crypto'

const DEFAULT_DECK_NAME: string = 'DEFAULT'

function InputColumn({ children }: { children: ReactNode }): JSX.Element {
  return <div className="flex flex-col">{children}</div>
}

function InputLabel({ children }: { children: ReactNode }): JSX.Element {
  return <label className="font-bold text-xl">{children}</label>
}
function AddCardForm(): JSX.Element {
  async function addCard(): Promise<void> {
    if (!cardFrontInput.trim()) {
      alert('Card front must be filled out.')
      return
    }
    const lastNote = expertNotesInput[expertNotesInput.length - 1]
    if (lastNote.subtitle.trim().length == 0 && lastNote.body.trim().length == 0) {
      expertNotesInput.pop()
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
    window.api.store.addCard(cardToAdd)
    window.close()
    // console.log('adding card to database')
  }

  const [cardFrontInput, setCardFront] = useState<string>('')
  const [cardBackInput, setCardBack] = useState<string>('')
  const [sideNoteInput, setSideNote] = useState<string>('')
  const [tagsInput, setCardTags] = useState<Tag[]>([])
  const [belongsToDeckInput, setBelongsToDeck] = useState<DeckName[]>([])
  const [expertNotesInput, setExpertNotes] = useState<ExpertNote[]>([])

  function changeCardToAddFront(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardFront(event.target.value)
  }

  function changeCardToAddBack(event: React.ChangeEvent<HTMLInputElement>): void {
    setCardBack(event.target.value)
  }

  function changeCardToAddSideNote(event: React.ChangeEvent<HTMLInputElement>): void {
    setSideNote(event.target.value)
  }

  function changeCardToAddBelongsToDeck(event: React.ChangeEvent<HTMLInputElement>): void {
    const newArray = event.target.value
      .split(',') // Here the input is assumed to be comma-separated, but we need a dropdown list of checkboxes
      .map((value) => {
        // only allows alphanumeric characters and spaces and converts it to uppercase
        return value
          .trim()
          .toUpperCase()
          .replace(/[^a-zA-Z0-9\s]/g, '')
      })
      .filter(Boolean) // empty deck names are not allowed
    if (newArray.length === 0) newArray.push(DEFAULT_DECK_NAME) // Assigns <DEFAULT_DECK_NAME> if the array is eventually empty
    setBelongsToDeck(newArray)
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
      <h1 className="text-2xl font-bold">New Card</h1>
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
          <button onClick={addExpertNote} className="ml-2">
            <AddSignIcon width="30px" height="30px" />
          </button>
        </InputColumn>
        <InputColumn>
          <InputLabel>Deck</InputLabel>
          <input
            onChange={changeCardToAddBelongsToDeck}
            type="text"
            placeholder={'Deck names'}
          ></input>
        </InputColumn>
        <InputColumn>
          <InputLabel>Tags</InputLabel>
          <CardTagging tempTagPool={tagsInput} setTags={setCardTags} />
        </InputColumn>

        <br></br>
        <button className=" bg-slate-800 hover:bg-slate-900" onClick={addCard}>
          Add Card (can be replaced by icon)
        </button>
      </div>
      <button onClick={addCard} className=" max-h-20 max-w-20">
        <CheckMarkIcon />
      </button>
      <CloseWindow />
    </div>
  )
}

export default AddCardForm
