import styles from "./playerActions.module.css";

export function PlayerActions(props) {
  return (
    <div className={styles.actionsContainer}>
      <button
        className={styles.actionBtn}
        onClick={props.onStand}
      >
        Stand
      </button>

      <button
        className={styles.actionBtn}
        onClick={props.onHit}
      >
        Hit
      </button>
    </div>
  )
}
