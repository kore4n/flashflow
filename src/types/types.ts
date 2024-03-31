type ActiveTab = 'Decks' | 'Cards' | 'Stats' | 'Study'

type Card = {
  name: string
  front: string
  back: string
  tags?: string[]
  deckName: string
  value: number
  // if you generated cards without deckName property,
  // delete them or else it will throw errors

  // Any other properties cards should hold
}

type Deck = {
  name: string
  cards: Card[]
  // Any other properties decks should hold
}

type DatabaseSchema = {
  cards: Card[]
  decks: Deck[]
}




export { type ActiveTab, type DatabaseSchema, type Card, type Deck }
