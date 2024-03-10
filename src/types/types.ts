type ActiveTab = 'Decks' | 'Cards' | 'Stats'

type Card = {
  cardID: number
  cardFront: string
  cardBack: string
  sideNote: string
  expertNotes: ExpertNote[]
  tags: Tag[]
  belongsToDeck: string
  cardStatus: number // can be some other type
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

type Tag = {
  tagText: string
  tagColor: string
}

type TagsInputProps = {
  tempTagPool: Tag[]
  setTags: (tags: Tag[]) => void
}

type ExpertNote = {
  subtitle: string
  body: string
}

export {
  type ActiveTab,
  type DatabaseSchema,
  type Card,
  type Deck,
  type Tag,
  type TagsInputProps,
  type ExpertNote
}
