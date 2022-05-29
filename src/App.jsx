import { createSignal, Match, onMount, Show, Switch } from "solid-js";
import { Alert } from "./components/alert/Alert";
import { showAlertMessage } from "./services/alert";
import { drawCards, loadDeck } from "./services/fetch";

import styles from "./app.module.css";
import { CardsHolder } from "./components/cardsHolder/CardsHolder";
import { PlayerActions } from "./components/playerActions/PlayerActions";
import { BoardMessage } from "./components/boardMessage/BoardMessage";

const MAX_POINTS = 21;

function App() {
  const [dealerCards, setDealerCards] = createSignal([]);
  const [playerCards, setPlayerCards] = createSignal([]);
  const [isFetchingDealerCards, setIsFetchingDealerCards] = createSignal(false);
  const [playerPoints, setPlayerPoints] = createSignal(0);
  const [gameState, setGameState] = createSignal({ gameFinished: false, winner: "", dealerTurn: false });
  let dealerIdInterval;

  async function drawDealerCard(numberOfCards = 1) {
    try {
      if (isFetchingDealerCards()) return;

      setIsFetchingDealerCards(true);

      const cards = await drawCards(numberOfCards);
      setDealerCards([...dealerCards(), ...cards,])
    } catch {
      showAlertMessage("Failed to draw card");
    } finally {
      setIsFetchingDealerCards(false);
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
    setPlayerPoints(points);

    if (points === MAX_POINTS) {
      setGameState({ gameFinished: true, winner: "Player", dealerTurn: false });
    } else if (points > MAX_POINTS) {
      setGameState({ gameFinished: true, winner: "Dealer", dealerTurn: false });
    }
  }

  function handleDealerPointsChange(points) {
    if (points === MAX_POINTS || (points > playerPoints() && gameState().dealerTurn)) {
      setGameState({ gameFinished: true, winner: "Dealer", dealerTurn: false });
      clearInterval(dealerIdInterval);
    } else if (points > MAX_POINTS) {
      setGameState({ gameFinished: true, winner: "Player", dealerTurn: false });
      clearInterval(dealerIdInterval);
    }
  }

  function handleHit() {
    drawPlayerCard();
  }

  function handleStand() {
    setGameState({ gameFinished: false, winner: "", dealerTurn: true });

    dealerIdInterval = setInterval(() => {
      drawDealerCard();
    }, 2000);
  }

  function handleRestart() {
    setGameState({ gameFinished: false, winner: "", dealerTurn: false });
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
        <Match when={gameState().dealerTurn}>
          <BoardMessage message="Dealer turn" />
        </Match>
        <Match when={!gameState().gameFinished}>
          <PlayerActions onHit={handleHit} onStand={handleStand} />
        </Match>
        <Match when={gameState().gameFinished}>
          <BoardMessage
            message={`${gameState().winner} won!`}
            showRestartBtn={true}
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
