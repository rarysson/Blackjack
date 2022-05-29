import styles from "./boardMessage.module.css";

export function BoardMessage(props) {
  return (
    <div className={styles.board}>
      <p className={styles.message}>{props.message}</p>
      <button className={styles.btn} onClick={props.onRestart}>Restart</button>
    </div>
  );
}
