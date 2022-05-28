import { getDeckId, setDeckId } from "./storage";

export async function loadDeck() {
  const id = getDeckId();

  if (id) return;

  const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6");
  const deck = await response.json();

  setDeckId(deck.deck_id);
}

export async function drawCards(numberOfCards = 1) {
  const deckId = getDeckId();

  if (deckId) {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfCards}`);
    const cards = await response.json();

    return cards.map(card => ({
      id: card.code,
      img: card.image,
      value: card.value
    }));
  }

  return [];
}

export async function reshuffleDeck() {
  const deckId = getDeckId();

  if (deckId) {
    await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle`);
  }
}
