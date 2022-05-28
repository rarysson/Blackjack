import { onMount } from "solid-js";
import { Alert } from "./components/alert/Alert";
import { setAlertMessage } from "./services/alert";
import { loadDeck } from "./services/fetch";

import styles from './app.module.css'

function App() {
  onMount(async () => {
    try {
      await loadDeck();
    } catch {
      setAlertMessage("Failed to load deck");

      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  });

  return (
    <div className={styles.app}>
      <Alert />
      <h1>Blackjack</h1>
    </div>
  );
}

export default App;
