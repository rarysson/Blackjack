import { createSignal, onMount } from "solid-js";
import { Alert } from "./components/alert/Alert";
import { showAlertMessage } from "./services/alert";
import { drawCards, loadDeck } from "./services/fetch";

import styles from "./app.module.css";
import { CardsHolder } from "./components/cardsHolder/CardsHolder";

function App() {
  const [dealerCards, setDealerCards] = createSignal([]);
  const [playerCards, setPlayerCards] = createSignal([]);

  async function drawPlayerCard(numberOfCards = 1) {
    try {
      const card = await drawCards(numberOfCards);
      setPlayerCards(c => [...card, ...c])
    } catch {
      showAlertMessage("Failed to draw card");
    }
  }

  async function drawDealerCard(numberOfCards = 1) {
    try {
      const card = await drawCards(numberOfCards);
      setDealerCards(c => [...card, ...c])
    } catch {
      showAlertMessage("Failed to draw card");
    }
  }

  onMount(async () => {
    try {
      await loadDeck();

      drawDealerCard();
      drawPlayerCard(2);
    } catch {
      showAlertMessage("Failed to load deck");
    }
  });

  return (
    <div className={styles.app}>
      <Alert />

      <CardsHolder
        className={styles.cardContainerTop}
        title="Dealer"
        cards={dealerCards()}
      />

      <CardsHolder
        className={styles.cardContainerBottom}
        title="Player"
        cards={playerCards()}
      />
    </div>
  );
}

export default App;
