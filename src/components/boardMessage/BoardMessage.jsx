import { Show } from "solid-js";

import styles from "./boardMessage.module.css";

export function BoardMessage(props) {
  return (
    <div className={styles.board}>
      <p className={styles.message}>{props.message}</p>
      <Show when={props.showRestartBtn}>
        <button
          className={styles.btn}
          onClick={props.onRestart}
        >
          Restart
        </button>
      </Show>
    </div>
  );
}
