import { createSignal, Match, onMount, Show, Switch } from "solid-js";
import { Alert } from "./components/alert/Alert";
import { showAlertMessage } from "./services/alert";
import { drawCards, loadDeck } from "./services/fetch";

import styles from "./app.module.css";
import { CardsHolder } from "./components/cardsHolder/CardsHolder";
import { PlayerActions } from "./components/playerActions/PlayerActions";
import { BoardMessage } from "./components/boardMessage/BoardMessage";

function App() {
  const [dealerCards, setDealerCards] = createSignal([]);
  const [playerCards, setPlayerCards] = createSignal([]);
  const [gameState, setGameState] = createSignal({ gameFinished: false, winner: "" });

  async function drawDealerCard(numberOfCards = 1) {
    try {
      const cards = await drawCards(numberOfCards);
      setDealerCards([...dealerCards(), ...cards,])
    } catch {
      showAlertMessage("Failed to draw card");
    }
  }

  async function drawPlayerCard(numberOfCards = 1) {
    try {
      const cards = await drawCards(numberOfCards);
      setPlayerCards([...playerCards(), ...cards,])
    } catch {
      showAlertMessage("Failed to draw card");
    }
  }

  function handlePlayerPointsChange(points) {
    if (points === 21) {
      setGameState({ gameFinished: true, winner: "Player" });
    } else if (points > 21) {
      setGameState({ gameFinished: true, winner: "Dealer" });
    }
  }

  function handleDealerPointsChange(points) {
    console.log("dealer: ", points);
  }

  function handleHit() {
    drawPlayerCard();
  }

  function handleRestart() {
    setGameState({ gameFinished: false, winner: "" });
    setPlayerCards([]);
    setDealerCards([]);

    drawDealerCard();
    drawPlayerCard(2);
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

      <Show when={dealerCards().length}>
        <CardsHolder
          className={styles.cardContainerTop}
          title="Dealer"
          cards={dealerCards()}
          titleOnBottom={true}
          onPointsChange={handleDealerPointsChange}
        />
      </Show>

      <Switch>
        <Match when={!gameState().gameFinished}>
          <PlayerActions onHit={handleHit} />
        </Match>
        <Match when={gameState().gameFinished}>
          <BoardMessage
            message={`${gameState().winner} won!`}
            onRestart={handleRestart}
          />
        </Match>
      </Switch>

      <Show when={playerCards().length}>
        <CardsHolder
          className={styles.cardContainerBottom}
          title="Player"
          cards={playerCards()}
          onPointsChange={handlePlayerPointsChange}
        />
      </Show>
    </div>
  );
}

export default App;
