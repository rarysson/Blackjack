import styles from "./card.module.css";

export function Card(props) {
  return (
    <div className={styles.card}>
      <img src={props.card.img} alt={props.card.value} width="150" height="210" />
    </div>
  );
}
