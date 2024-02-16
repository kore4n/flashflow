
interface Card { }

interface Deck {
    id: number;
    name: string;
    cards: Card[]
}

class DeckBasics {
    FAKE_DECK_MEMORY: Deck[];

    constructor() {
        let addBtn = document.getElementById("addBtn")!;
        addBtn.addEventListener("click", (e:Event) => this.addDeck());

        let deleteBtn = document.getElementById("deleteBtn")!;
        deleteBtn.addEventListener("click", (e:Event) => this.deleteDeck());

        let editBtn = document.getElementById("editBtn")!;
        editBtn.addEventListener("click", (e:Event) => this.editDeck());

        let getBtn = document.getElementById("getBtn")!;
        getBtn.addEventListener("click", (e:Event) => this.getDeck());

        let getAllBtn = document.getElementById("getAllBtn")!;
        getAllBtn.addEventListener("click", (e:Event) => this.getAllDecks());
    }

    addDeck(): void {
        let newDeck: Deck = {
            id: 1,
            name: "test",
            cards: []
        }

        this.FAKE_DECK_MEMORY.push(newDeck);
    }

    deleteDeck(): void {
        this.FAKE_DECK_MEMORY.pop();
    }

    editDeck(): boolean {
        return false;
    }

    getDeck(): boolean {
        return false;
    }

     getAllDecks(): Deck[] {
        var decks = [];
        return decks;
    }
}

new DeckBasics();
