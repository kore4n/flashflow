async function frontOfCardAlreadyExists(cardFront: string): Promise<boolean> {
  const cardInDatabase = await window.api.store.getCardByFront(cardFront)

  if (cardInDatabase) return true

  return false
}

function cardNameIsEmpty(cardName): boolean {
  return cardName.trim() ? false : true
}

function cardFrontIsValid(cardFront: string): boolean {
  return cardFront.trim() ? true : false
}

function cardBackIsValid(cardBack: string): boolean {
  return cardBack.trim() ? true : false
}

async function cardIsValid(
  // cardName: string,
  cardFront: string,
  cardBack: string
): Promise<boolean> {
  const frontOfCardExists = await frontOfCardAlreadyExists(cardFront.trim())

  if (frontOfCardExists) return false
  // if (cardNameIsEmpty(cardName.trim())) return false
  if (!cardFrontIsValid(cardFront.trim())) return false
  // if (!cardBackIsValid(cardBack.trim())) return false

  return true
}

export { frontOfCardAlreadyExists, cardFrontIsValid, cardBackIsValid, cardNameIsEmpty, cardIsValid }
