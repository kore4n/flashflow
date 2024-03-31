type ActiveTab = 'Decks' | 'Cards' | 'Stats'

type Card = {
  // name: string
  cardID?: number
  front: string
  back: string
  tags?: string[]
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
